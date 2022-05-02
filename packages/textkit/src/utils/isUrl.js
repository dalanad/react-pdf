/**
 * reference https://github.com/segmentio/is-url/blob/master/index.js
 */
/* eslint-disable no-useless-escape */
const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;

/**
 * Checks if string is a URL
 *
 * @param  {string}  value value
 * @return {Boolean} is URL
 */
const isUrl = value => {
  if (typeof value !== 'string') {
    return false;
  }

  const match = value.match(protocolAndDomainRE);
  if (!match) {
    if (localhostDomainRE.test(value) || nonLocalhostDomainRE.test(value)) {
      return true;
    }

    return false;
  }

  const everythingAfterProtocol = match[1];
  if (!everythingAfterProtocol) {
    return false;
  }

  if (
    localhostDomainRE.test(everythingAfterProtocol) ||
    nonLocalhostDomainRE.test(everythingAfterProtocol)
  ) {
    return true;
  }

  return false;
};

export default isUrl;
