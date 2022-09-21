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
  const notes = [];
  let str = '';

  for (const item of nodes) {
    let text = '';

    if (item.type === 'TEXT') {
      text = item.children.map(e => e.value).reduce((a, b) => a + b, '');
    }

    if (item.type === 'TEXT_INSTANCE') {
      text = item.value;
    }

    str += text;

    if (item.props && item.props.footnote) {
      notes.push({ loc: str.length, el: item, ref: text });
    }

    if (item.children) {
      const calculatedOutput = calculateFootnoteLocations(item.children);

      const childNotes = calculatedOutput.notes.map(r => ({
        ...r,
        loc: r.loc + str.length,
      }));

      if (childNotes.length > 0) str += calculatedOutput.childString;
      notes.push(...childNotes);
    }
  }

  return { notes, str };
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
    const { notes: calculatedNotes } = calculateFootnoteLocations(
      node.children,
    );
    const notes = [];
    let topUpto = (node.box?.top || 0) + top;

    for (const line of node.lines) {
      notes.push(
        ...calculatedNotes
          .filter(e => e.loc - e.ref.length < line.textBefore + line.string.length)
          .filter(e => e.loc >= line.textBefore)
          .map(r => ({
            ...r,
            approxTop: topUpto,
            approxBottom: topUpto + line.box.height,
          })),
      );
      topUpto += line.box.height;
    }

    return notes;
  }

  for (const child of node.children) {
    footnotes.push(
      ...getFootnotes(child, node.box?.top === 0 ? top : node?.box?.top),
    );
  }
  return footnotes;
}

export default getFootnotes;
