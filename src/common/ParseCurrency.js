/**
 * Remove special characters ($ and ,) so we are working with a real float and not a string.
 * @param {number} value dollar amount to be parsed
 */
const ParseCurrency = value => {
  return parseFloat(value.replace(/[,$]/g, ""));
};

export { ParseCurrency };
