import * as R from 'ramda';

const getAvailableFontFeatures = R.path(['availableFeatures']);

const isFontFeatureExist = (font, feature) => {
  const availableFontFeatures = getAvailableFontFeatures(font);
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

      const words = string.split(' ');

      const wordsList = words
        .map(word => {
          if (word.charAt(0).search(/[A-Z]/g) !== -1) {
            return [
              {
                string: word.charAt(0).toUpperCase(),
                attributes: { ...attributes, fontVariant: 'normal' },
              },
              {
                string: `${word.substr(1, word.length - 1)} `.toUpperCase(),
                attributes,
              },
            ];
          }
          return [
            {
              string: `${word} `.toUpperCase(),
              attributes,
            },
          ];
        })
        .reduce((acc, next) => {
          acc.push(...next);
          return acc;
        }, []);

      processedFragments.push(...wordsList);
    } else {
      processedFragments.push({ string: string.toUpperCase(), attributes });
    }
  });
  return processedFragments;
};

export default processSmallCaps;
