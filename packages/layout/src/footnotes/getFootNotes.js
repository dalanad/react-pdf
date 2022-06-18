/**
 * calculates the locations  of the footnotes within the given node array
 * this is used to check if a footnote is actually inside a node after line breaking and splitting
 * 
 * @param {Array} nodes 
 * @returns Array
 */
function calculateFootnoteLocations(nodes) {
  let foot_notes = [];
  let str = '';
  for (const item of nodes) {
    if (item.props && item.props.footNote) {
      foot_notes.push({ loc: str.length, el: item });
    }
    if (item.type == 'TEXT_INSTANCE') {
      str += item.value;
    }
  }

  return foot_notes;
}

/**
 * Finds all footnotes in a given node
 * checks if a footnote is actually present in the calculated lines of a node
 * 
 * @param {Object} node 
 * @param {number} top 
 * @returns 
 */
function getFootNotes(node, top = 0) {
  if (node.props?.footNote) {
    return [{ el: node, loc: 0, approxTop: 0 }];
  }

  let foot_notes = [];

  if (!node.children) return [];

  if (node.lines) {
    let footnoteLocations = calculateFootnoteLocations(node.children);
    let notes = [];
    let lengthUpto = 0;
    let topUpto = top;

    for (const line of node.lines) {
      lengthUpto = lengthUpto + line.string.length;
      topUpto = topUpto + line.box.height;

      notes.push(
        ...footnoteLocations
          .filter(e => e.loc < lengthUpto)
          .filter(e => e.loc > lengthUpto - line.string.length)
          .map(r => ({ ...r, approxTop: topUpto })),
      );
    }

    return notes;
  }

  for (const child of node.children) {
    foot_notes.push(...getFootNotes(child, (node.box?.top || 0) + top));
  }
  return foot_notes;
}

export default getFootNotes;
