import * as R from 'ramda';
import * as P from '@paladin-analytics/primitives';

const isEllipse = R.propEq('type', P.Ellipse);

export default isEllipse;
