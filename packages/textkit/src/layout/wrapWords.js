import * as R from 'ramda';

import isUrl from '../utils/isUrl';

/**
 * Default word hyphenation engine used when no one provided.
 * Does not perform word hyphenation at all
 *
 * @param  {String} word
 * @return {Array} same word
 */
const defaultHyphenationEngine = word => [word];

/**
 * Wrapper for HyphenationEngine
 * This wrapper function handles the special case of word being a URL
 * URL text length is often longer than the page width. For that URL text will be split into charactors
 * Ex: http://example.com?text=xxx -> ["h","t","t","p",":","/","/","e","x","a","m","p","l","e",".","c","o","m","?","t","e","x","t","=","x","x","x"]
 *
 * @param {HyphenationEngine} hyphenator
 * @param {String} word
 * @returns {HyphenationEngine}
 */
const hyphenateWordWrapper = (hyphenator, word) => {
  if (isUrl(word)) {
    return _word => _word.split('');
  }
  return hyphenator;
};

/**
 * @summary TO handle the already hyphenated parts,
                - This will break the parts which have hyphens into smaller parts
 * @param parts- parts array from `hyphen`
 *                
 */
const handleHyphenedWords = (parts)=>{
     const newParts = [];

     // eslint-disable-next-line no-plusplus
     for (let curP=0 ; curP < parts.length;curP++) {
       
       const part =parts[curP];
 
       if(part.includes("-")||part.includes("—")){
         let lastSplitPoint = -1
         // eslint-disable-next-line no-plusplus
         for (let i = 0; i < part.length; i++) {
           if(part[i]==="-" || part[i]==="—"){
             newParts.push(part.slice(lastSplitPoint+1,i+1))
             lastSplitPoint=i;
           }
          
          //  To handle the edge characters
           if(i === part.length-1 && lastSplitPoint!==i){
             newParts.push(part.slice(lastSplitPoint+1,part.length))
           }
         }
 
       }else{
         newParts.push(part)
       }
     }

     return newParts;
}

/**
 * Wrap words of attribute string
 *
 * @param  {Object} layout engines
 * @param  {Object}  layout options
 * @param  {Object}  attributed string
 * @return {Object} attributed string including syllables
 */
const wrapWords = (engines = {}, options = {}, attributedString) => {
  const syllables = [];

  const hyphenateWord =
    options.hyphenationCallback ||
    (engines.wordHyphenation && engines.wordHyphenation(options)) ||
    defaultHyphenationEngine;

  const words = attributedString.string.split(/([ ]+)/g).filter(Boolean);

  for (let j = 0; j < words.length; j += 1) {
    const word = words[j];
    const parts = hyphenateWordWrapper(hyphenateWord, word)(word);
    const newParts = handleHyphenedWords(parts);
    syllables.push(...newParts);
  }
  return { ...attributedString, syllables };
};

export default R.curryN(3, wrapWords);
