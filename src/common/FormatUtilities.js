/**
 * Standard Currency Formatter for the US
 */
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

/**
 * Format a currency value as number to the standard string representation
 * @param {number} dollarAmount number representation of the currency to format
 */
const FormatCurrency = dollarAmount => currencyFormatter.format(dollarAmount);

/**
 * Format as decimal as a percentage
 * @param {number} percentageAsDecimal
 */
const FormatPercentage = percentageAsDecimal => `${percentageAsDecimal * 100}%`;

/**
 * Parse number to float
 * @param {string} amount
 */
const ParseAmountToFloat = amount => {
  return parseFloat(amount.replace(/,/g, ""));
};
/**
 * Format string to currency format(1000000 to 1,234,567)
 * @param {string} n
 */
const FormatNumber = n => {
  return n
    .replace(/^0+/, "")
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
/**
 * preserve currency string format
 * @param {number} n
 */
const PreserveDecimalFormatNumber = n => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Format value to curreny text format
 * @param {string} value
 * @param {boolean} isNegativeValue
 */
const FormattedAmount = (value, isNegativeValue) => {
  let fieldValue = 0;
  if (
    !value
      .trim()
      .charAt(0)
      .match(/^[1-9]\d*|\.$/)
  ) {
    return [0, fieldValue];
  }

  if (value.indexOf(".") >= 0) {
    var decimal_pos = value.indexOf(".");
    var left_side = value.substring(0, decimal_pos);
    var right_side = value.substring(decimal_pos);
    if (left_side.length > 0) {
      value =
        FormatNumber(left_side) +
        "." +
        FormatNumber(right_side).substring(0, 2);

      fieldValue = isNegativeValue
        ? -ParseAmountToFloat(value)
        : ParseAmountToFloat(value);
    } else {
      var rightSideLength = right_side.length;
      var rightFormatedValue = "." + FormatNumber(right_side).substring(0, 2);
      value = rightSideLength === 1 ? value : rightFormatedValue;
      fieldValue =
        rightSideLength === 1
          ? 0
          : isNegativeValue
          ? -ParseAmountToFloat(rightFormatedValue)
          : ParseAmountToFloat(rightFormatedValue);
    }
  } else {
    value = FormatNumber(value);
    fieldValue = isNegativeValue
      ? -ParseAmountToFloat(value)
      : ParseAmountToFloat(value);
  }
  return [value, fieldValue];
};

export {
  FormatCurrency,
  FormatPercentage,
  PreserveDecimalFormatNumber,
  FormattedAmount,
  ParseAmountToFloat,
  FormatNumber
};
