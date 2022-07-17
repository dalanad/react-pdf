import * as R from 'ramda';
import getFootnotePlaceholder from './getFootnotePlaceholder';

const getStyleHeight = R.pathOr(0, ['style', 'height']);
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
  const pageHeight = getStyleHeight(page);

  let footnotesHeight = FOOTNOTES_MIN_HEIGHT;
  let spacingNeeded = 0;

  const chosenFootnotes = [];
  const placeholder = getFootnotePlaceholder(page);

  if (placeholder) {
    const getFootnoteView = a => placeholder.children[0].children[a + 1];

    const initialFootnotes = footnotes.map((e, index) => {
      const footnoteView = getFootnoteView(index);
      const footnoteHeight = getHeight(footnoteView);

      return { ...e, heightNeeded: footnoteHeight, footnoteView };
    });

    let groupedFootnotes = groupByKey(initialFootnotes, 'approxTop');

    groupedFootnotes = groupedFootnotes.map(e => ({
      footnoteGroup: e,
      groupTop: e[0].approxTop,
      groupBottom: e[0].approxBottom,
      totalHeight: e.reduce((a, b) => a + b.heightNeeded, 0),
    }));

    for (let i = 0; i < groupedFootnotes.length; i += 1) {
      const {
        totalHeight,
        footnoteGroup,
        groupBottom,
        groupTop,
      } = groupedFootnotes[i];

      const spaceAfterAdding = pageHeight - footnotesHeight - totalHeight;
      const spaceWithoutAdding = pageHeight - footnotesHeight;

      if (groupBottom < spaceAfterAdding) {
        footnotesHeight += totalHeight;
        chosenFootnotes.push(...footnoteGroup);
      } else {
        if (groupTop < spaceWithoutAdding) {
          spacingNeeded = totalHeight;
        }
        break;
      }
    }
  }

  return {
    footnotes: chosenFootnotes,
    spacingNeeded,
  };
}
