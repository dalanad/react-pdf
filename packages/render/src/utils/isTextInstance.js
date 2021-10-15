import * as R from 'ramda';
import * as P from '@paladin-analytics/primitives';

const isTextInstance = R.propEq('type', P.TextInstance);

export default isTextInstance;
