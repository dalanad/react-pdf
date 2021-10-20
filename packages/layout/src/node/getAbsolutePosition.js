/**
 * Get Yoga computed position. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} position
 */
const getAbsolutePosition = node => {
  let yogaNode = node._yogaNode;

  const position = {
    absTop: 0,
    absRight: 0,
    absBottom: 0,
    absLeft: 0,
  };

  while (yogaNode) {
    position.absTop += yogaNode?.getComputedTop() || 0;
    position.absRight += yogaNode?.getComputedRight() || 0;
    position.absBottom += yogaNode?.getComputedBottom() || 0;
    position.absLeft += yogaNode?.getComputedLeft() || 0;

    yogaNode = yogaNode.getParent();
  }

  return position;
};

export default getAbsolutePosition;
