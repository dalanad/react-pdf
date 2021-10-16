import * as R from 'ramda';
import * as P from '@paladin-analytics/rpdf-primitives';

const isTextInstance = R.propEq('type', P.TextInstance);

export default isTextInstance;
