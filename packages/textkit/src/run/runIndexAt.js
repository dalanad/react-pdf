import * as R from 'ramda';

/**
 * Get run index that contains passed index
 *
 * @param  {number}  char index
 * @param  {Array}  runs array
 * @return {Array} run index
 */
const runIndexAt = (x, runs) => {
  // binary search to find the index
  const n = runs.length;
  let k = -1;

  const ok = (v) => v >= n || x < runs[v].end;
  for (let b = n; b >= 1; b = Math.floor(b / 2)) {
    while (!ok(k + b)) k += b;
  }
  return k + 1;
};

export default R.curryN(2, runIndexAt);
