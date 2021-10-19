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
      const words = string.split(' ');
      const processedWordsFragments = words
        .map(word => {
          const hasCaps = hasCapitals(word);
          if (hasCaps) {
            const chars = word.split('');

            let tempStr = '';
            const substrings = [];
            chars.map(char => {
              if (hasCapitals(char)) {
                substrings.push(tempStr);
                substrings.push(char);
                tempStr = '';
                return char;
              }
              tempStr += char;
              return char;
            });
            substrings.push(tempStr);

            const validatedSubstrings = substrings.filter(str => str !== '');

            const wordFragments = validatedSubstrings.map((str, index) => {
              const uppercaseStr = str.toUpperCase();
              if (hasCapitals(str)) {
                return {
                  string:
                    index === validatedSubstrings.length - 1
                      ? `${uppercaseStr} `
                      : uppercaseStr,
                  attributes: { ...attributes, fontVariant: 'normal' },
                };
              }
              return {
                string:
                  index === validatedSubstrings.length - 1
                    ? `${uppercaseStr} `
                    : uppercaseStr,
                attributes,
              };
            });
            return [...wordFragments];
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

      processedFragments.push(...processedWordsFragments);
    } else {
      processedFragments.push({ string: string.toUpperCase(), attributes });
    }
  });
  return processedFragments;
};

export default processSmallCaps;
