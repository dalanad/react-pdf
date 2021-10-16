import * as R from 'ramda';
import * as P from '@paladin-analytics/rpdf-primitives';

const isText = R.propEq('type', P.Text);

export default isText;
