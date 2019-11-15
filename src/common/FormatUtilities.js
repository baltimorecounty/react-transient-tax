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

export { FormatCurrency, FormatPercentage };
