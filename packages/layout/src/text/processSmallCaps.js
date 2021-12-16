import * as R from 'ramda';

const getAvailableFontFeatures = R.path(['availableFeatures']);
const hasCapitals = word => word.search(/[A-Z]/g) !== -1;

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

const processSmallCaps = fragments => {
  const processedFragments = [];
  fragments.forEach(({ string, attributes }) => {
    const { fontVariant, font } = attributes;
    if (fontVariant === 'small-caps') {
      if (isFontFeatureExist(font, getFontFeatureTag(fontVariant))) {
        processedFragments.push({ string, attributes });
        return;
      }

      const words = string.split(/(?=[A-Z][a-z])|(?=[A-Z])/) || [];

      const processedWordsFragments = words
        .map(word => {
          const chars = word.split('') || [];
          let uprecaseString = '';
          let lowercaseString = '';
          const stringFragments = [];
          chars.map(char => {
            const hasCaps = hasCapitals(char);
            if (hasCaps) {
              uprecaseString += char;
              return;
            }
            lowercaseString += char;
            // eslint-disable-next-line no-useless-return
            return;
          });
          if (uprecaseString !== '') {
            stringFragments.push({
              string: uprecaseString,
              attributes: { ...attributes, fontVariant: 'normal' },
            });
          }
          if (lowercaseString !== '') {
            stringFragments.push({
              string: lowercaseString,
              attributes: { ...attributes },
            });
          }
          return stringFragments;
        })
        .reduce((acc, next) => {
          acc.push(...next);
          return acc;
        }, []);

      processedFragments.push(...processedWordsFragments);
    } else {
      processedFragments.push({ string, attributes });
    }
  });
  return processedFragments;
};

export default processSmallCaps;
