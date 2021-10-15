import * as R from 'ramda';
import * as P from '@paladin-analytics/primitives';

const isText = R.propEq('type', P.Text);

export default isText;
