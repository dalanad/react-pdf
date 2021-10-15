import * as R from 'ramda';
import * as P from '@paladin-analytics/primitives';

const isPath = R.propEq('type', P.Path);

export default isPath;
