/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */

import * as R from 'ramda';
import * as P from '@paladin-analytics/rpdf-primitives';
import { resolvePageDimensions } from './resolveDimensions';
import resolveInheritance from './resolveInheritance';
import resolveTextLayout from './resolveTextLayout';

import resolveStyles from './resolveStyles';
import resolvePageSizes from './resolvePageSizes';

import resolvePagePaddings from './resolvePagePaddings';
import asyncCompose from '../utils/asyncCompose';
import resolvePagination from './resolvePagination';

/**
 * Time taken to tune `letterSpacing` is inversely proportional to the sensitivity of `letterSpacing`.
 * Increasing the following value will result in a more sensitive `letterSpacing`, at the cost of time.
 */
const BINARY_SEARCH_DEPTH = 3;

const isText = R.propEq('type', P.Text);

const assingChildren = R.assoc('children');

/**
 * Relayouts a given page, (with new letterSpacing applied to text nodes)
 * @returns Tuple where first element contains # of pages after re-layouting, second element contains the re-layouted page
 */
const relayoutPage = async (page, doc, fontStore) => {
  const isolatedDoc = {
    ...doc,
    children: [page],
  };

  const result = await asyncCompose(
    resolvePagination,
    resolveTextLayout,
    resolvePageDimensions,
    resolveInheritance,
    resolvePagePaddings,
    resolveStyles,
    resolvePageSizes,
  )(isolatedDoc, fontStore);

  return [result.children.length, result.children[0]];
};

const applyLetterSpacingProp = (node, letterSpacing) => {
  if (isText(node)) {
    // we only allow to tinker around with text nodes that have been explicitly marked with `allowAutomaticTextSpaceAdjustment` attribute
    if (node.props?.allowAutomaticTextSpaceAdjustment === true) {
      // we don't do the transformation to the textNode where the split happened
      // because the transformation can change the position of the last character of last line
      if (!(node.props && typeof node.props.lineSkips !== 'undefined')) {
        /** The absolute value is computed by following _https://helpx.adobe.com/indesign/using/kerning-tracking.html_ */
        const absoluteSpacing =
          letterSpacing * (1 / 1000) * (node.style?.fontSize || 1);

        return R.compose(
          R.assocPath(['style', 'letterSpacing'], absoluteSpacing),
        )(node);
      }
    }
  }

  if (node.children) {
    return R.compose(
      R.evolve({
        children: R.map(child => applyLetterSpacingProp(child, letterSpacing)),
      }),
    )(node);
  }

  return node;
};

const dropLayoutAttributes = node => {
  if (isText(node)) {
    return R.compose(
      R.assocPath(['box'], {}),
      R.dissocPath(['box']),
      R.dissocPath(['lines']),
    )(node);
  }

  return R.compose(
    R.assocPath(['box'], {}),
    R.dissocPath(['box']),
    R.evolve({
      children: R.map(dropLayoutAttributes),
    }),
  )(node);
};

const relayoutPageToIncreaseLines = async (page, doc, fontStore) => {
  /** maximum relative letter space value */
  const maxCandidateValue = 8;
  /** maximum depth we expect for the binary search. The binary search will cost ~O(maxCandidateValue) */
  const maxBinarySearchDepth = BINARY_SEARCH_DEPTH;
  /** minimum offset used within the binary search, determined based on `maxCandidateValue` and `maxBinarySearchDepth` */
  const minimumOffsetValue = maxCandidateValue / 2 ** maxBinarySearchDepth;

  /** data structure to memoize already computed relayouting results */
  const memoizedResults = new Map();

  /**
   * Relayouts the page and returns true if it is possible to layout the page without overflowing into multiple pages.
   * While doing the relayouting, this function memoizes the results, so no `candidateValue` causes the relayout to happen twice
   */
  const queryIsPossibleToLayouteInSinglePage = async candidateValue => {
    if (candidateValue > maxCandidateValue) {
      return false;
    }

    if (memoizedResults.has(candidateValue)) {
      return memoizedResults.get(candidateValue)[0] === 1;
    }

    const preparedPage = dropLayoutAttributes(
      applyLetterSpacingProp(page, candidateValue),
    );
    const result = await relayoutPage(preparedPage, doc, fontStore);
    memoizedResults.set(candidateValue, result);
    return result[0] === 1;
  };

  let relativeLetterSpace = -1;
  // binary search to find the maximum possible letterSpacing while staying under a single page
  for (
    let offset = maxCandidateValue;
    offset >= minimumOffsetValue;
    offset /= 2
  ) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const result = await queryIsPossibleToLayouteInSinglePage(
        relativeLetterSpace + offset,
      );
      if (result) {
        relativeLetterSpace += offset;
      } else {
        break;
      }
    }
  }

  return memoizedResults.get(relativeLetterSpace)[1];
};

/**
 * Returns the number of lines that have been skipped due to orphan/widow protection
 */
const getLineSkipsCount = node => {
  let skipped = 0;

  if (node.props && typeof node.props.lineSkips !== 'undefined') {
    skipped += node.props.lineSkips;
  } else if (node.children) {
    for (let index = 0; index < node.children.length; index += 1) {
      skipped += getLineSkipsCount(node.children[index]);
    }
  }

  return skipped;
};

/**
 * Returns `true` if there are any text nodes with `allowAutomaticTextSpaceAdjustment` set to `true`
 */
const hasAdjustableTextNodes = node => {
  if (node.props && node.props.allowAutomaticTextSpaceAdjustment === true) {
    return true;
  }

  if (node.children) {
    for (let index = 0; index < node.children.length; index += 1) {
      if (hasAdjustableTextNodes(node.children[index])) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Performs page balancing for the paginatd pages.
 *
 * @param {Object} node
 * @param {Object} fontStore font store
 */
const resolvePageBalancing = async (doc, fontStore) => {
  const pages = [];

  for (let i = 0; i < doc.children.length; i += 1) {
    const page = doc.children[i];
    const linesSkipped = getLineSkipsCount(page);
    const isAdjustable = hasAdjustableTextNodes(page);
    if (linesSkipped && isAdjustable) {
      const relayoutedPage = await relayoutPageToIncreaseLines(
        page,
        doc,
        fontStore,
      );
      pages.push(relayoutedPage);
    } else {
      pages.push(page);
    }
  }

  return assingChildren(pages, doc);
};

export default resolvePageBalancing;
