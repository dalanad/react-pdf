import * as R from 'ramda';
import * as P from '@paladin-analytics/primitives';

const isPage = R.propEq('type', P.Page);

export default isPage;
