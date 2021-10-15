const processSmallCaps = fragments => {
  const processedFragments = [];
  fragments.forEach(({ string, attributes }) => {
    const { fontVariant } = attributes;
    if (fontVariant === 'small-caps') {
      const words = string.split(' ');

      const wordsList = words
        .map(word => `${word.charAt(0)}_${word.substr(1, word.length - 1)} `)
        .join('_')
        .split('_');

      const fragmentList = wordsList.map(word => {
        if (word.length === 1) {
          return {
            string: word,
            attributes: { ...attributes, fontVariant: 'normal' },
          };
        }
        return {
          string: word,
          attributes,
        };
      });
      processedFragments.push(...fragmentList);
    } else {
      processedFragments.push({ string, attributes });
    }
  });
  return processedFragments;
};

export default processSmallCaps;
