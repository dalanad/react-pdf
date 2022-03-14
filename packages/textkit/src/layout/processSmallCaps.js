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

const hasSimpleLetters = word => word.search(/[a-z\s]/g) !== -1;

const groupWordCharactors = word => {
  const charactors = word.split('');
  let uprecaseString = '';
  let lowercaseString = '';
  const letterGroups = [];
  charactors.forEach((char, index) => {
    if (hasSimpleLetters(char)) {
      lowercaseString += char;
      if (!charactors[index + 1] || !hasSimpleLetters(charactors[index + 1])) {
        letterGroups.push(lowercaseString);
        lowercaseString = '';
      }
      return;
    }
    if (!hasSimpleLetters(char)) {
      uprecaseString += char;
      if (!charactors[index + 1] || hasSimpleLetters(charactors[index + 1])) {
        letterGroups.push(uprecaseString);
        uprecaseString = '';
      }
    }
  });
  return letterGroups;
};

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

    const stringChunck = string.substring(start, end);

    const words = stringChunck.split(/(?=[A-Z][a-z])|(?=[A-Z])/) || [];

    let stringStartIndex = start;

    const processWords = word => {
      const stringFragments = [];
      const letterGroups = groupWordCharactors(word);
      letterGroups.forEach(chars => {
        if (hasSimpleLetters(chars)) {
          stringFragments.push({
            start: stringStartIndex,
            end: stringStartIndex + chars.length,
            attributes,
          });
          stringStartIndex += chars.length;
          return;
        }
        stringFragments.push({
          start: stringStartIndex,
          end: stringStartIndex + chars.length,
          attributes: { ...attributes, fontVariant: 'normal' },
        });
        stringStartIndex += chars.length;
      });
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
