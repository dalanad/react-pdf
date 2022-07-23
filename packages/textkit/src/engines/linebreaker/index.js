import * as R from 'ramda';

import bestFit from './bestFit';
import linebreak from './linebreak';
import slice from '../../attributedString/slice';
import insertGlyph from '../../attributedString/insertGlyph';
import advanceWidthBetween from '../../attributedString/advanceWidthBetween';
import hasOnlySpaces from '../../utils/hasOnlySpaces';
import isUrl from '../../utils/isUrl';

const HYPHEN = 0x002d;
const TOLERANCE_STEPS = 5;
const TOLERANCE_LIMIT = 50;

const opts = {
  width: 3,
  stretch: 6,
  shrink: 9,
};

/**
 * Get regions of urls in the attributed string
 *
 * @param {Object} attributedString attributed string
 * @returns {Array} regions of urls
 */
const getUrlRegions = attributedString => {
  const urlRegions = [];

  const words = attributedString.string.split(/([ ]+)/g).filter(Boolean);
  let start = 0;
  for (let index = 0; index < words.length; index += 1) {
    const word = words[index];
    if (isUrl(word)) {
      urlRegions.push({ start, end: start + word.length });
    }
    start += word.length;
  }

  return urlRegions;
};

/**
 * Check whether the line is in the URL region
 *
 * @param {Object[]} urlRegions URL Regions
 * @param {Number} attributedStringLineEndPosition attributed string line end position
 * @returns {Boolean} if the line is in the URL region return true otherwise false
 */
const isInUrlRegion = (urlRegions, attributedStringLineEndPosition) => {
  // last url region end position before the start of the line region
  let lastUrlRegionEnd = null;
  for (let index = 0; index < urlRegions.length; index += 1) {
    const { start, end } = urlRegions[index];
    if (start <= attributedStringLineEndPosition) {
      lastUrlRegionEnd = end;
    }
  }

  if (!lastUrlRegionEnd) return false;

  return attributedStringLineEndPosition < lastUrlRegionEnd;
};

/**
 * Slice attributed string to many lines
 *
 * @param {Object} attributed string
 * @param  {Array}  nodes
 * @param  {Array}  breaks
 * @return {Array} attributed strings
 */
const breakLines = (string, nodes, breaks) => {
  let start = 0;
  let end = null;

  const urlRegions = getUrlRegions(string);

  const lines = breaks.reduce((acc, breakPoint) => {
    const node = nodes[breakPoint.position];
    const prevNode = nodes[breakPoint.position - 1];

    // Last breakpoint corresponds to K&P mandatory final glue
    if (breakPoint.position === nodes.length - 1) return acc;

    let line;
    if (node.type === 'penalty') {
      end = prevNode.value.end;

      line = slice(start, end, string);
      // If the line is a part of a URL Hyphen character will not be inserted (Inserting a hyphen will change the URL)
      if (!isInUrlRegion(urlRegions, end)) {
        line = insertGlyph(line.length, HYPHEN, line);
      }
    } else {
      end = node.value.end;
      line = slice(start, end, string);
    }

    start = end;
    return [...acc, line];
  }, []);

  // Last line
  lines.push(slice(start, string.string.length, string));

  return lines;
};

/**
 * Return Knuth & Plass nodes based on line and previously calculated syllables
 *
 * @param {Object} attributed string
 * @param  {Object}  attributed string
 * @param  {Object}  layout options
 * @return {Array} attributed strings
 */
const getNodes = (attributedString, { align }, options) => {
  let start = 0;

  const hyphenWidth = 5;
  const { syllables } = attributedString;
  const hyphenPenalty =
    options.hyphenationPenalty || (align === 'justify' ? 100 : 600);

  const result = syllables.reduce((acc, s, index) => {
    const width = advanceWidthBetween(
      start,
      start + s.length,
      attributedString,
    );

    if (s.trim() === '') {
      const stretch = (width * opts.width) / opts.stretch;
      const shrink = (width * opts.width) / opts.shrink;
      const value = { start, end: start + s.length };

      acc.push(linebreak.glue(width, value, stretch, shrink));
    } else {
      /**
       * hyphenationCallback = null --> have used the default hyphenation mechanism (simply,hyphenation is enabled)
       * hyphenationCallback != null --> hyphenation is disabled (assumed that custom hyphenation callback is only used to disable the hyphenation 👉🏻 (word)=>[word])
       * s[s.length-1] !== "-"   --> to avoid having multiple hyphens at the line end
       * */
      const hyphenated =
          options.hyphenationCallback === null && s[s.length-1] !== "-" 
            ? !hasOnlySpaces(syllables[index + 1])
            : false;

      const value = { start, end: start + s.length };
      acc.push(linebreak.box(width, value, hyphenated));

      if (syllables[index + 1] && hyphenated) {
        acc.push(linebreak.penalty(hyphenWidth, hyphenPenalty, 1));
      }
    }

    start += s.length;

    return acc;
  }, []);

  result.push(linebreak.glue(0, null, linebreak.infinity, 0));
  result.push(linebreak.penalty(0, -linebreak.infinity, 1));

  return result;
};

const getStyles = R.pathOr({}, ['attributedString', 'runs', 0, 'attributes']);

/**
 * Performs Knuth & Plass line breaking algorithm
 * Fallbacks to best fit algorithm if latter not successful
 *
 * @param  {Object}  layout options
 * @param  {Object}  attributed string
 * @param {Object} attributed string
 * @return {Array} attributed strings
 */
const lineBreaker = (options, attributedString, availableWidths) => {
  let tolerance = options.tolerance || 4;

  const style = getStyles(attributedString);
  const nodes = getNodes(attributedString, style, options);

  let breaks = linebreak(nodes, availableWidths, { tolerance });

  // Try again with a higher tolerance if the line breaking failed.
  while (breaks.length === 0 && tolerance < TOLERANCE_LIMIT) {
    tolerance += TOLERANCE_STEPS;
    breaks = linebreak(nodes, availableWidths, { tolerance });
  }

  if (
    breaks.length === 0 ||
    (breaks.length === 1 && breaks[0].position === 0)
  ) {
    breaks = bestFit(nodes, availableWidths);
  }

  return breakLines(attributedString, nodes, breaks.slice(1));
};

export default R.curryN(3, lineBreaker);
