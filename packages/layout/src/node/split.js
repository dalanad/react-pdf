import * as R from 'ramda';
import * as P from '@paladin-analytics/rpdf-primitives';

import splitText from '../text/splitText';
// eslint-disable-next-line import/no-cycle
import splitView from '../view/splitView';

const isText = R.propEq('type', P.Text);

const split = R.ifElse(isText, splitText, splitView);

export default split;
