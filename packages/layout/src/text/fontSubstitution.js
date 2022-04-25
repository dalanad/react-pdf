import * as R from 'ramda';

import StandardFont from './standardFont';

const fontCache = {};

const IGNORED_CODE_POINTS = [173];

const getFontSize = R.pathOr(12, ['attributes', 'fontSize']);

const getOrCreateFont = name => {
  if (fontCache[name]) return fontCache[name];

  const font = new StandardFont(name);
  fontCache[name] = font;

  return font;
};

const getDefaultFallbackFont = () => getOrCreateFont('Helvetica');

const isGlyphAvailable = (codePoint, font) => font.hasGlyphForCodePoint(codePoint);

/**
 * Determines the font that can render a specific character
 * 
 * Priority Order: (desired font family) > (first feasible of the specified fallback font families) > Helvetica
 * @returns Font
 */
const determineFont = (codePoint, defaultFont, fallbackFonts) => {
  const possibleFonts = [...fallbackFonts];
  if(defaultFont) possibleFonts.unshift(defaultFont);

  for(let i=0; i<possibleFonts.length; i+= 1) {
    if(IGNORED_CODE_POINTS.includes(codePoint)) return possibleFonts[i];
    if(isGlyphAvailable(codePoint, possibleFonts[i])) return possibleFonts[i];
  }

  return getDefaultFallbackFont();
}

const fontSubstitution = () => ({ string, runs }) => {
  let lastFont = null;
  let lastFontSize = null;
  let lastIndex = 0;
  let index = 0;

  const res = [];

  for (let i = 0; i < runs.length; i += 1) {
    const run = runs[i];

    const defaultFont =
      typeof run.attributes.font === 'string'
        ? getOrCreateFont(run.attributes.font)
        : run.attributes.font;

    const fallbackFonts = [...(run.attributes.fallbackFonts || []).map((font) => typeof font === 'string' ? getOrCreateFont(font) : font), getDefaultFallbackFont()];

    if (string.length === 0) {
      res.push({ start: 0, end: 0, attributes: { font: defaultFont } });
      break;
    }

    const chars = string.slice(run.start, run.end);

    for (let j = 0; j < chars.length; j += 1) {
      const char = chars[j];
      const codePoint = char.codePointAt();

      // Determine which font can be used to render a character into the PDF
      const font = determineFont(codePoint, defaultFont, fallbackFonts);
      const fontSize = getFontSize(run);

      // If anything that would impact res has changed, update it
      if (
        font !== lastFont ||
        fontSize !== lastFontSize ||
        font.unitsPerEm !== lastFont.unitsPerEm
      ) {
        if (lastFont) {
          res.push({
            start: lastIndex,
            end: index,
            attributes: {
              font: lastFont,
              scale: lastFontSize / lastFont.unitsPerEm,
            },
          });
        }

        lastFont = font;
        lastFontSize = fontSize;
        lastIndex = index;
      }

      index += char.length;
    }
  }

  if (lastIndex < string.length) {
    const fontSize = getFontSize(R.last(runs));

    res.push({
      start: lastIndex,
      end: string.length,
      attributes: {
        font: lastFont,
        scale: fontSize / lastFont.unitsPerEm,
      },
    });
  }

  return { string, runs: res };
};

export default fontSubstitution;
