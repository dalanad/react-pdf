import * as R from 'ramda';
import * as P from '@paladin-analytics/rpdf-primitives';

const isPath = R.propEq('type', P.Path);

export default isPath;
