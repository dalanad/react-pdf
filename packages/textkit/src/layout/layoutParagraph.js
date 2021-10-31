import * as R from 'ramda';

import omit from '../run/omit';
import stringHeight from '../attributedString/height';

const ATTACHMENT_CODE = '\ufffc'; // 65532

/**
 * Remove attachment attribute if no char present
 *
 * @param  {Object} attributed string
 * @return {Object} attributed string
 */
const purgeAttachments = R.when(
  R.compose(R.not, R.includes(ATTACHMENT_CODE), R.prop('string')),
  R.evolve({
    runs: R.map(omit('attachment')),
  }),
);

/**
 * Layout paragraphs inside rectangle
 *
 * @param  {Object} rect
 * @param  {Array} attributed strings
 * @return {Object} layout blocks
 */
const layoutLines = (rect, lines, widths, offsets) => {
  let currentY = rect.y;

  return R.addIndex(R.map)(
    R.compose(purgeAttachments, (line, i) => {
      const style = R.pathOr({}, ['runs', 0, 'attributes'], line);
      const height = Math.max(stringHeight(line), style.lineHeight);
      const box = {
        x:
          rect.x +
          (i < offsets.length ? offsets[i] : offsets[offsets.length - 1]),
        y: currentY,
        width: i < widths.length ? widths[i] : widths[widths.length - 1],
        height,
      };

      currentY += height;

      return R.compose(R.assoc('box', box), R.omit(['syllables']))(line);
    }),
  )(lines);
};

const computeOffsetsAndWidths = (containerRect, maskRects, lineHeight) => {
  const results = [];
  let maskIndex = 0;
  let lineIndex = 0;

  while (maskIndex < maskRects.length) {
    while (
      (lineIndex + 1) * lineHeight + containerRect.y <
      maskRects[maskIndex].y
    ) {
      results.push({ offset: 0, width: containerRect.width });
      lineIndex += 1;
    }
    while (
      maskRects[maskIndex].y + maskRects[maskIndex].height >=
      lineIndex * lineHeight + containerRect.y
    ) {
      // colliding region with mask
      const widthToRight = Math.min(
        containerRect.width -
          (maskRects[maskIndex].width -
            (containerRect.x - maskRects[maskIndex].x)),
      );
      const widthToLeft = Math.min(
        maskRects[maskIndex].x - containerRect.x,
        containerRect.width,
      );
      if (widthToLeft >= widthToRight) {
        results.push({ offset: 0, width: widthToLeft });
      } else {
        results.push({
          offset: containerRect.width - widthToRight,
          width: widthToRight,
        });
      }
      lineIndex += 1;
    }

    maskIndex += 1;
  }

  results.push({ offset: 0, width: containerRect.width });

  return results;
};

/**
 * Performs line breaking and layout
 *
 * @param  {Object} engines
 * @param  {Object}  layout options
 * @param  {Object} rect
 * @param  {Object} attributed string
 * @return {Object} layout block
 */
const layoutParagraph = (engines, options) => (rect, paragraph) => {
  const indent = R.pathOr(0, ['runs', 0, 'attributes', 'indent'], paragraph);

  const lineHeight = stringHeight(paragraph);
  const offsetsAndWidths = computeOffsetsAndWidths(
    rect,
    options.maskRects || [],
    lineHeight,
  );

  // duplicating the last line width to avoid applying identations to all the lines
  const extendedOffsetsAndWidths = [
    ...offsetsAndWidths,
    offsetsAndWidths[offsetsAndWidths.length - 1],
  ];
  const widths = extendedOffsetsAndWidths.map((item, index) => {
    if (index === 0) {
      return item.width - indent;
    }
    return item.width;
  });

  const offsets = extendedOffsetsAndWidths.map((item, index) => {
    if (index === 0) {
      return item.offset + indent;
    }
    return item.offset;
  });

  const lines = engines.linebreaker(options)(paragraph, widths);
  const lineFragments = layoutLines(rect, lines, widths, offsets);
  return lineFragments;
};

export default layoutParagraph;
