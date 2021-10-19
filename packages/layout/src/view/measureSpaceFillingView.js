import * as R from 'ramda';

/**
 * Yoga space filling view measure function
 *
 * @param {number} fillNeeded
 * @returns {Object} canvas width and height
 */
const measureSpaceFillingView = fillNeeded => {
  return { height: fillNeeded };
};

export default R.curryN(5, measureSpaceFillingView);
