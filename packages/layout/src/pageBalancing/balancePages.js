import * as R from 'ramda';

const getHeight = R.path(['box', 'height']);

const getLastLine = node => {
  if (node.lines) {
    return node.lines[node.lines.length - 1];
  }

  if (node.children) {
    for (let i = node.children.length - 1; i >= 0; i -= 1) {
      const lastLine = getLastLine(node.children[i]);
      if (lastLine) return lastLine;
    }
  }

  return null;
};

const getLastLineDiff = node => {
  if (node.lines) {
    const linesHeight = node.lines.reduce((a, b) => a + b.box.height, 0);
    return node.box.height - linesHeight;
  }

  if (node.children) {
    const heights = node.children.map(child => getLastLineDiff(child));
    const childsHeight = node.children.reduce((a, b) => a + b.box.height, 0);

    return Math.max(
      ...heights,
      node.box.height -
        node.box.paddingTop -
        node.box.paddingBottom -
        childsHeight,
    );
  }

  return 0;
};

const changeLineHeights = (node, factor) => {
  const updatedNode = { ...node };
  if (node.lines) {
    updatedNode.lines = node.lines.map(line => {
      if (line.box.height)
        return R.merge(line, {
          box: {
            ...line.box,
            height: line.box.height * factor,
            y: line.box.y * factor,
          },
        });
      return line;
    });
  } else {
    updatedNode.children = node.children.map(child =>
      changeLineHeights(child, factor),
    );
  }

  return updatedNode;
};

/**
 *
 *
 *
 */
const balancePages = pagesToBalance => {

  const pages = [...pagesToBalance];

  for (let i = 0; i < pages.length; i += 1) {
    let page = pages[i];
    const height = Math.floor(getHeight(page));

    const lastLine = getLastLine(page);
    const diff = getLastLineDiff(page);
    const increaseFactor = Math.trunc((height / (height - diff)) * 100) / 100;

    if (diff > lastLine.box.height && diff < lastLine.box.height * 3) {
      page = changeLineHeights(page, increaseFactor);
    }
    pages[i] = page;
  }
  return pages;
};

export default balancePages;
