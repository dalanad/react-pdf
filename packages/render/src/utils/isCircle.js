import * as R from 'ramda';
import * as P from '@paladin-analytics/rpdf-primitives';

const isCircle = R.propEq('type', P.Circle);

export default isCircle;
