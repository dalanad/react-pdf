/* eslint-disable no-continue */

import * as R from 'ramda';

import getWrap from './getWrap';
import getNodesHeight from './getNodesHeight';

const getBreak = R.pathOr(false, ['props', 'break']);
const getTop = R.pathOr(0, ['box', 'top']);
const getHeight = R.path(['box', 'height']);

const getMinPresenceAhead = R.path(['props', 'minPresenceAhead']);
const getMinSpaceAhead = R.path(['props', 'minSpaceAhead']);

const defaultPresenceAhead = element => height =>
  Math.min(element.box.height, height);

const getPresenceAhead = (elements, height) => {
  let result = 0;

  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];

    if (!element.box) continue;

    const isElementInside = height > element.box.top;
    const presenceAhead =
      element.props.presenceAhead || defaultPresenceAhead(element);

    if (element && isElementInside) {
      result += presenceAhead(height - element.box.top);
    }
  }

  return result;
};

/**
 * Returns the height of the child components with `wrapTextAround` attribute if the parent node
 * has explicitly specified `hasWrapTextAroundComponent` attribute
 * @param {Object} node
 * @returns number
 */
const getWrapTextAroundChildrenHeight = node => {
  if (!node.props?.hasWrapTextAroundComponent) {
    return 0;
  }
  const queue = [node];
  let height = 0;
  while (queue.length) {
    const top = queue.pop();
    (top.children || []).forEach(child => queue.push(child));

    if (top.props?.wrapTextAround) {
      height += top.box?.height || 0;
    }
  }
  return height;
};

const hasMinSpaceAhead = (child, height, minSpaceAhead) => {
  if (!minSpaceAhead) return true;

  const nodeTop = getTop(child);
  const nodeHeight = getHeight(child);
  console.log(child);
  const hasSpaceInPage = height < nodeTop + nodeHeight + minSpaceAhead;
  const notLargerThanPage = height > nodeHeight + minSpaceAhead;

  return hasSpaceInPage && notLargerThanPage;
};

const shouldBreak = (child, futureElements, height) => {
  const minPresenceAhead = getMinPresenceAhead(child);
  const minSpaceAhead = getMinSpaceAhead(child);
  const presenceAhead = getPresenceAhead(futureElements, height);
  const futureHeight = getNodesHeight(futureElements);
  const wrapTextAroundChildrenHeight = getWrapTextAroundChildrenHeight(child);
  const shouldSplit =
    height < child.box.top + child.box.height + wrapTextAroundChildrenHeight;
  const shouldWrap = getWrap(child);

  return (
    getBreak(child) ||
    !hasMinSpaceAhead(child, height, minSpaceAhead) ||
    (!shouldWrap && shouldSplit) ||
    (wrapTextAroundChildrenHeight && shouldSplit) ||
    (minPresenceAhead < futureHeight && presenceAhead < minPresenceAhead)
  );
};

export default shouldBreak;
