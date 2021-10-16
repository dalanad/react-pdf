import * as R from 'ramda';
import * as P from '@paladin-analytics/rpdf-primitives';

const isSvg = R.propEq('type', P.Svg);

export default isSvg;
