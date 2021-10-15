import * as R from 'ramda';
import * as P from '@paladin-analytics/primitives';

const isPolygon = R.propEq('type', P.Polygon);

export default isPolygon;
