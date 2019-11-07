/**
 * Calulate the interest based on tax collected and the number of months late.
 * @param {number} taxCollected dollar amount to base the interest off
 * @param {number} numberOfMonthsLate number of months the user has failed to pay their tax
 * @param {number} interest - interest rate to charge as a decimal
 */
const CalulateInterest = (taxCollected, numberOfMonthsLate, interest = 0.01) =>
  taxCollected * interest * numberOfMonthsLate;

export { CalulateInterest };
