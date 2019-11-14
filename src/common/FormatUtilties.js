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

export { FormatCurrency };
