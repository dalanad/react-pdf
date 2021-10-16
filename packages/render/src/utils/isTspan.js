import * as R from 'ramda';
import * as P from '@paladin-analytics/rpdf-primitives';

const isTspan = R.propEq('type', P.Tspan);

export default isTspan;
