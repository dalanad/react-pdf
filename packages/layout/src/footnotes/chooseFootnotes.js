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
 *  3. If we can't fit the line including the references and footnotes in the same page,
 *     we will limit the no of footnotes shown to available space
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

  let chosenFootnotes = [];
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
      breakAfter: e[0].breakAfter,
    }));

    for (let i = 0; i < groupedFootnotes.length; i += 1) {
      const {
        totalHeight,
        footnoteGroup,
        groupBottom,
        groupTop,
        breakAfter,
      } = groupedFootnotes[i];
      const lineHeight = groupBottom - groupTop;

      const spaceAfterAdding =
        contentArea - footnotesHeight - totalHeight - groupBottom;

      // include footnotes if space is available
      if (
        spaceAfterAdding > lineHeight ||
        (spaceAfterAdding > 0 && breakAfter)
      ) {
        footnotesHeight += totalHeight;
        chosenFootnotes.push(...footnoteGroup);
      }

      // case where space is not enough to include all the notes
      else {
        const availableSpace = contentArea - groupBottom - footnotesHeight;
        // keep at least 3 lines to avoid triggering widow / orphan
        // todo: use breakAfter/Before to calculate this
        const minContentSpace = lineHeight * 3;
        /* 
          if the references and the footnotes height total is greater than the page,
          show the footnotes in the available space and discard others
        */
        // todo: do this only if at least one footnote can be shown on current page 
        if (
          minContentSpace + totalHeight > contentArea &&
          chosenFootnotes.length === 0
        ) {
          const chosen = chooseToFitHeight(footnoteGroup, availableSpace);
          chosenFootnotes.push(...chosen);
          footnotesHeight += chosen.reduce((a, b) => a + b.heightNeeded, 0);

          spacingNeeded =
            contentArea -
            Math.max(groupBottom, minContentSpace) -
            footnotesHeight;
        } else {
          // filter footnotes that will be shifted due to orphan / widow protection
          chosenFootnotes = chosenFootnotes.filter(note => {
            // bottom of the line containing the note reference
            const noteBottom = note.approxBottom - page.box.paddingTop;
            // height between current groupTop(shift point) and note bottom
            const spaceAfter = groupTop - noteBottom;
            // if the line is the last line, a break should be allowed after it to include it
            return spaceAfter > lineHeight || note.breakAfter;
          });

          // if they can be included in a single page add a space and shift the reference to next page
          spacingNeeded =
            contentArea -
            groupTop -
            (chosenFootnotes.length > 0 ? footnotesHeight : 0);
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
