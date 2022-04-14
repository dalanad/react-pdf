/**
 * Check string only has spaces
 * 
 * @param {String} value string value
 * @returns {Boolean} value has spaces
 */
const hasOnlySpaces = value => {
  if(!value) return false;
  const regx = /^[\s]+$/;
  return regx.test(value);
};

export default hasOnlySpaces;
