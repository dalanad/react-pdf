/**
 * Checks if string is a URL
 *
 * @param  {string}  value value
 * @return {Boolean} is URL
 */
const isUrl = value => {
  // eslint-disable-next-line no-useless-escape
  const regx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  return regx.test(value);
};

export default isUrl;
