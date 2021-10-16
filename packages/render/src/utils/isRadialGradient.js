import * as R from 'ramda';
import * as P from '@paladin-analytics/rpdf-primitives';

const isRadialGradient = R.propEq('type', P.RadialGradient);

export default isRadialGradient;
