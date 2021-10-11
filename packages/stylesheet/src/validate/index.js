const marginValidator = style => {
  // An element should not have both inside/outside margins and left/right margins
  const hasInsideOutsideMargins =
    style.marginInside !== undefined || style.marginOutside !== undefined;
  const hasLeftRightMargins =
    style.marginLeft !== undefined || style.marginRight !== undefined;

  if (hasInsideOutsideMargins && hasLeftRightMargins) {
    throw new Error(
      'Cannot have both inside/outside margins and left/right margins specified for a single component!',
    );
  }

  return true;
};

const validators = [marginValidator];

/**
 * Validates style values
 *
 * @param {Object} styles object
 * @returns {Object} transformed styles
 */
const validate = style => {
  if (!style) return style;

  validators.every(validator => validator(style));
  return style;
};

export default validate;
