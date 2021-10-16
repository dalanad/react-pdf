import * as R from 'ramda';
import * as P from '@paladin-analytics/rpdf-primitives';

const isPolyline = R.propEq('type', P.Polyline);

export default isPolyline;
