import * as R from 'ramda';

import splitNode from '../node/splitNode';
// eslint-disable-next-line import/no-cycle
import splitNodes from '../node/splitNodes';

const assingChildren = R.assoc('children');

const getTop = R.pathOr(0, ['box', 'top']);

const getChildren = R.propOr([], 'children');

const splitChildren = (height, contentArea, node) => {
  const children = getChildren(node);
  const availableHeight = height - getTop(node);
  return splitNodes(availableHeight, contentArea, children);
};

const splitView = (node, height, contentArea) => {
  const [currentNode, nextNode] = splitNode(node, height);
  const [currentChilds, nextChildren] = splitChildren(
    height,
    contentArea,
    node,
  );

  const next = assingChildren(nextChildren)(nextNode);

  if (next?.children.length) {
    return [assingChildren(currentChilds)(currentNode), next];
  }

  return [assingChildren(currentChilds)(currentNode), null];
};

export default splitView;
