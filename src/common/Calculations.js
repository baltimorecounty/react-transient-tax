/**
 * Calulate the interest based on tax collected and the number of months late.
 * @param {number} taxCollected dollar amount to base the interest off
 * @param {number} numberOfMonthsLate number of months the user has failed to pay their tax
 * @param {number} interest - interest rate to charge
 */
const CalulateInterest = (
  taxCollected,
  numberOfMonthsLate,
  interest = 0.01
) => {
  return taxCollected * interest * numberOfMonthsLate;
};

/**
 * Calulate the penalty fee based on tax collected.
 * @param {number} taxCollected dollar amount to base the penalty off of
 * @param {number} penaltyFee penalty fee percentage as a decimal
 */
const CalculatePenalty = (taxCollected, penaltyFee = 0.1) =>
  taxCollected * penaltyFee;

export { CalulateInterest, CalculatePenalty };
