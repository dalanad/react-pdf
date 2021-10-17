import * as R from 'ramda';
import * as P from '@paladin-analytics/rpdf-primitives';

const isImage = R.propEq('type', P.Image);

export default isImage;
