import * as R from 'ramda';
import * as P from '@paladin-analytics/primitives';

const isRadialGradient = R.propEq('type', P.RadialGradient);

export default isRadialGradient;
