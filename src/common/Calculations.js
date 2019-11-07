import { RatesAndFees } from "./Constants";

/**
 * Calulate the interest based on tax collected and the number of months late.
 * @param {number} taxCollected dollar amount to base the interest off
 * @param {number} numberOfMonthsLate number of months the user has failed to pay their tax
 * @param {number} interest - interest rate to charge as a decimal
 */
const CalulateInterest = (
  taxCollected,
  numberOfMonthsLate,
  interest = RatesAndFees.InterestRate
) => taxCollected * interest * numberOfMonthsLate;

/**
 * Calulate the penalty fee based on tax collected.
 * @param {number} taxCollected dollar amount to base the penalty off of
 * @param {number} penaltyRate penalty fee percentage as a decimal
 */
const CalculatePenalty = (
  taxCollected,
  penaltyRate = RatesAndFees.PenaltyRate
) => taxCollected * penaltyRate;

export { CalulateInterest, CalculatePenalty };
