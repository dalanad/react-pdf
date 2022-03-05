import * as R from 'ramda';
import processSmallCaps from './processSmallCaps';

const getFontUnitsPerEm = R.path(['font', 'unitsPerEm']);
const getFontDescent = R.path(['font', 'descent']);
const getFontAscent = R.path(['font', 'ascent']);
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

const calculateSizeAndScale = run => {
  const { attributes = {} } = run;
  const {
    fontSize: baseFontSize,
    fontVariant,
    scale: baseScale,
    yOffset: baseYOffset,
    font,
  } = attributes;
  const fontUnitsPerEm = getFontUnitsPerEm(attributes);

  let fontSize = baseFontSize;
  let scale = baseScale;
  let yOffset = baseYOffset;

  if (['superscript', 'subscript'].includes(fontVariant)) {
    fontSize = (baseFontSize * 75) / 100;
  }

  if (
    ['small-caps'].includes(fontVariant) &&
    !isFontFeatureExist(font, getFontFeatureTag(fontVariant))
  ) {
    fontSize = (baseFontSize * 75) / 100;
  }

  scale = fontSize / fontUnitsPerEm;
  const fontAscent = getFontAscent(attributes);
  const fontDescent = getFontDescent(attributes);

  if (fontVariant === 'superscript') {
    let _YOffset = (fontAscent * 50) / (100 * fontUnitsPerEm);
    if (fontUnitsPerEm >= 2000) {
      _YOffset = (fontAscent * 30) / (100 * fontUnitsPerEm);
    }
    yOffset += _YOffset;
  }

  if (fontVariant === 'subscript') {
    yOffset += (fontDescent * 80) / (200 * fontUnitsPerEm);
  }

  return { ...run, attributes: { ...attributes, fontSize, scale, yOffset } };
};

/**
 * Calculate font size and scale according to font varients
 *
 * @param  {Object}   layout engines
 * @param  {Array}    attributed strings
 * @return {Array}    attributed string with resolved font sizes and scales
 */
const resolveTextStyles = () => attributedString =>
  R.compose(
    R.evolve({ runs: R.map(calculateSizeAndScale) }),
    processSmallCaps,
  )(attributedString);

export default resolveTextStyles;
