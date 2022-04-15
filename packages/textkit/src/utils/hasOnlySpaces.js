/**
 * Check string only has spaces
 * 
 * @param {String} value string value
 * @returns {Boolean} value has spaces
 */
const hasOnlySpaces = value => {
  if(typeof value !== 'string') return false;
  const trimedValue = value.trim();
  if(!trimedValue) return true;
  return false;
};

export default hasOnlySpaces;
