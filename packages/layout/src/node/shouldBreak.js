/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */

import * as R from 'ramda';
import * as P from '@paladin-analytics/rpdf-primitives';

import getWrap from './getWrap';
import getNodesHeight from './getNodesHeight';
import splitText from '../text/splitText';
// eslint-disable-next-line import/no-cycle
import { splitView } from '../steps/resolvePagination';

const getBreak = R.pathOr(false, ['props', 'break']);

const getBreakIfLastOnPage = R.pathOr(false, ['props', 'breakIfLastOnPage']);

const getMinPresenceAhead = R.path(['props', 'minPresenceAhead']);

const isText = R.propEq('type', P.Text);

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

/**
 * Returns whether the node has any drawable lines
 *
 * @param {Array} content
 * @returns boolean
 */
const hasAnyLines = content => {
  if (Array.isArray(content)) {
    for (const child of content) {
      if (child?.lines?.length) {
        return true;
      }

      return hasAnyLines(child?.children);
    }
  }

  return false;
};

/**
 * Returns whether the node should be pushed to the next page
 * by checking the behaviour of next sibling
 *
 * @param {Array} futureElements
 * @param {Number} presenceAhead
 * @param {Number} height
 * @param {Number} contentArea
 * @returns boolean
 */
const shouldPushToNextPage = (
  futureElements,
  presenceAhead,
  height,
  contentArea,
) => {
  if (!futureElements.length) return false;

  const nextChild = futureElements[0];
  const nextHeight = getNodesHeight([nextChild]);

  if (nextHeight <= presenceAhead) return false;

  if (!getWrap(nextChild)) {
    return true;
  }

  if (isText(nextChild)) {
    const [currentContent] = splitText(nextChild, height);
    if (!currentContent.lines.length) return true;
  } else {
    const [currentContent] = splitView(nextChild, height, contentArea);
    if (!hasAnyLines(currentContent?.children)) return true;
  }

  return false;
};

const shouldBreak = (child, futureElements, height, contentArea) => {
  const minPresenceAhead = getMinPresenceAhead(child);
  const presenceAhead = getPresenceAhead(futureElements, height);
  const futureHeight = getNodesHeight(futureElements);
  const wrapTextAroundChildrenHeight = getWrapTextAroundChildrenHeight(child);
  const shouldSplit =
    height < child.box.top + child.box.height + wrapTextAroundChildrenHeight;
  const shouldWrap = getWrap(child);

  return (
    getBreak(child) ||
    (!shouldWrap && shouldSplit) ||
    (wrapTextAroundChildrenHeight && shouldSplit) ||
    (minPresenceAhead < futureHeight && presenceAhead < minPresenceAhead) ||
    (getBreakIfLastOnPage(child) &&
      shouldPushToNextPage(futureElements, presenceAhead, height, contentArea))
  );
};

export default shouldBreak;
