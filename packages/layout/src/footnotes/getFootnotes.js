/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */

/**
 * calculates the locations  of the footnotes within the given node array
 * this is used to check if a footnote is actually inside a node after line breaking and splitting
 *
 * @param {Array} nodes
 * @returns Array
 */
function calculateFootnoteLocations(nodes) {
  const footnotes = [];
  let str = '';

  for (const item of nodes) {
    if (item.props && item.props.footnote) {
      footnotes.push({ loc: str.length, el: item });
    }

    if (item.type === 'TEXT') {
      str += item.children.map(e => e.value).reduce((a, b) => a + b, '');
    }

    if (item.type === 'TEXT_INSTANCE') {
      str += item.value;
    }
  }

  return footnotes;
}

/**
 * Finds all footnotes in a given node
 * checks if a footnote is actually present in the calculated lines of a node
 *
 * @param {Object} node
 * @param {number} top
 * @returns
 */
function getFootnotes(node, top = 0) {
  if (node.props?.footnote) {
    return [
      { el: node, loc: 0, approxTop: top, approxBottom: top + node.box.height },
    ];
  }

  const footnotes = [];

  if (!node.children) return [];

  if (node.lines) {
    const footnoteLocations = calculateFootnoteLocations(node.children);
    const notes = [];
    let topUpto = top;

    for (const line of node.lines) {
      topUpto += line.box.height;

      notes.push(
        ...footnoteLocations
          .filter(e => e.loc < line.textBefore + line.string.length)
          .filter(e => e.loc > line.textBefore)
          .map(r => ({
            ...r,
            approxTop: topUpto,
            approxBottom: topUpto + line.box.height,
          })),
      );
    }

    return notes;
  }

  for (const child of node.children) {
    footnotes.push(...getFootnotes(child, (node.box?.top || 0) + top));
  }
  return footnotes;
}

export default getFootnotes;
