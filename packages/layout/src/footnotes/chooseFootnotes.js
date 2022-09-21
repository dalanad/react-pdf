import * as R from 'ramda';
import getContentArea from '../page/getContentArea';
import getFootnotePlaceholder from './getFootnotePlaceholder';

const getHeight = R.path(['box', 'height']);

const FOOTNOTES_MIN_HEIGHT = 15;

const groupByKey = (array, key) => {
  return Object.values(
    array.reduce((r, a) => {
      const groups = r;
      groups[a[key]] = groups[a[key]] || [];
      groups[a[key]].push(a);
      return groups;
    }, {}),
  );
};

const chooseToFitHeight = (group, height) => {
  const chosen = [];
  let totalHeight = 0;
  for (let i = 0; i < group.length; i += 1) {
    const note = group[i];

    if (totalHeight + note.heightNeeded > height) {
      break;
    }

    chosen.push(note);
    totalHeight += note.heightNeeded;
  }
  return chosen;
};
/**
 * Given page, choose which footnotes to include in the page considering,
 *
 *  1. If the footnote is included, will the reference to the footnote be on the same page,
 *  2. If not, will the reference move back to the page given more space being available
 *
 *  If case 2 is happening we need to limit he content height for that page so that,
 *  the reference won't move back to the previous page.
 *  For that, this function also returns a space that needs added to the
 *
 * @param {page} page
 *
 * @returns {Object} containing footnotes array and contentHeight
 */
export default function chooseFootnotes(page, footnotes) {
  const contentArea = getContentArea(page);

  let footnotesHeight = FOOTNOTES_MIN_HEIGHT;
  let spacingNeeded = 0;

  const chosenFootnotes = [];
  const placeholder = getFootnotePlaceholder(page);

  if (placeholder) {
    const getFootnoteView = a => placeholder.children[0].children[a + 1];

    const initialFootnotes = footnotes.map((e, index) => {
      const footnoteView = getFootnoteView(index);
      const footnoteHeight =
        getHeight(footnoteView) +
        footnoteView.box.marginBottom +
        footnoteView.box.marginTop;

      return { ...e, heightNeeded: footnoteHeight, footnoteView };
    });

    let groupedFootnotes = groupByKey(initialFootnotes, 'approxTop');

    groupedFootnotes = groupedFootnotes.map(e => ({
      footnoteGroup: e,
      groupTop: e[0].approxTop - page.box.paddingTop,
      groupBottom: e[0].approxBottom - page.box.paddingTop,
      totalHeight: e.reduce((a, b) => a + b.heightNeeded, 0),
    }));

    for (let i = 0; i < groupedFootnotes.length; i += 1) {
      const {
        totalHeight,
        footnoteGroup,
        groupBottom,
        groupTop,
      } = groupedFootnotes[i];

      const spaceAfterAdding =
        contentArea - footnotesHeight - totalHeight - groupBottom;

      // include footnotes if space is available
      if (spaceAfterAdding > 0) {
        footnotesHeight += totalHeight;
        chosenFootnotes.push(...footnoteGroup);
      }

      // case where space is not enough to include all the notes
      else {
        const lineHeight = groupBottom - groupTop;
        const availableSpace = contentArea - groupBottom - footnotesHeight;
        /* 
          if the references and the footnotes height total is greater than the page,
          show the footnotes in the available space and discard others
        */
        // todo: do this only if at least one footnote can be shown on current page
        if (lineHeight * 4 + totalHeight > contentArea) {
          const chosen = chooseToFitHeight(footnoteGroup, availableSpace);
          chosenFootnotes.push(...chosen);
          footnotesHeight += chosen.reduce((a, b) => a + b.heightNeeded, 0);
          spacingNeeded = contentArea - groupBottom - footnotesHeight;
        } else {
          // if they can be included in a single page add a space and shift the reference to next page
          spacingNeeded = contentArea - groupTop - footnotesHeight;
        }
        break;
      }
    }
  }

  return {
    footnotes: chosenFootnotes,
    spacingNeeded: Math.floor(Math.max(0, spacingNeeded)),
  };
}
