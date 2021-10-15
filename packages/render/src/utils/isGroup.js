import * as R from 'ramda';
import * as P from '@paladin-analytics/primitives';

const isGroup = R.propEq('type', P.G);

export default isGroup;
