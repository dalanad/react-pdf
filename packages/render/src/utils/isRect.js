import * as R from 'ramda';
import * as P from '@paladin-analytics/primitives';

const isRect = R.propEq('type', P.Rect);

export default isRect;
