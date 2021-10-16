import * as R from 'ramda';
import * as P from '@paladin-analytics/rpdf-primitives';

const isLine = R.propEq('type', P.Line);

export default isLine;
