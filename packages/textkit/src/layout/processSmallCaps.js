import * as R from 'ramda';

const getAvailableFontFeatures = R.path(['availableFeatures']);
const isFontFeatureExist = (font, feature) => {
  const availableFontFeatures = getAvailableFontFeatures(font);
  if (!availableFontFeatures) return false;
  return availableFontFeatures.includes(feature);
};
const getFontFeatureTag = feature => {
  switch (feature) {
    case 'small-caps':
      return 'smcp';
    default:
      return null;
  }
};

const hasCapitals = word => word.search(/[A-Z]/g) !== -1;

const processSmallCaps = attributedString => {
  const { string, runs } = attributedString;
  const processRun = run => {
    const { start, end, attributes } = run;
    const { fontVariant, font } = attributes;

    if (!['small-caps'].includes(fontVariant)) {
      return [run];
    }

    if (
      ['small-caps'].includes(fontVariant) &&
      isFontFeatureExist(font, getFontFeatureTag(fontVariant))
    ) {
      return [run];
    }

    const stringChunck = string.substr(start, end);

    const words = stringChunck.split(/(?=[A-Z][a-z])|(?=[A-Z])/) || [];

    let stringStartIndex = start;

    const processWords = word => {
      const charactors = word.split('');
      let uprecaseString = '';
      let lowercaseString = '';
      const stringFragments = [];
      charactors.forEach(char => {
        const hasCaps = hasCapitals(char);
        if (hasCaps) {
          uprecaseString += char;
          return;
        }
        lowercaseString += char;
      });
      if (uprecaseString !== '') {
        stringFragments.push({
          start: stringStartIndex,
          end: stringStartIndex + uprecaseString.length,
          attributes: { ...attributes, fontVariant: 'normal' },
        });
        stringStartIndex += uprecaseString.length;
      }
      if (lowercaseString !== '') {
        stringFragments.push({
          start: stringStartIndex,
          end: stringStartIndex + lowercaseString.length,
          attributes: { ...attributes },
        });
        stringStartIndex += lowercaseString.length;
      }

      return stringFragments;
    };

    return R.compose(
      R.reduce((acc, elem) => {
        acc.push(...elem);
        return acc;
      }, []),
      R.map(processWords),
    )(words);
  };

  return R.assoc(
    'runs',
    R.compose(R.reduce(R.concat, []), R.map(processRun))(runs),
  )(attributedString);
};

export default processSmallCaps;
