import * as R from 'ramda';
import * as P from '@paladin-analytics/rpdf-primitives';

const isCanvas = R.propEq('type', P.Canvas);

export default isCanvas;
