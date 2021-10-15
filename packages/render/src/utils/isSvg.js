import * as R from 'ramda';
import * as P from '@paladin-analytics/primitives';

const isSvg = R.propEq('type', P.Svg);

export default isSvg;
