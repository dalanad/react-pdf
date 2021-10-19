import * as R from 'ramda';
import * as P from '@paladin-analytics/rpdf-primitives';

const isEllipse = R.propEq('type', P.Ellipse);

export default isEllipse;
