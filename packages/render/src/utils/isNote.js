import * as R from 'ramda';
import * as P from '@paladin-analytics/rpdf-primitives';

const isNote = R.propEq('type', P.Note);

export default isNote;
