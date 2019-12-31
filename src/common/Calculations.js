import { RatesAndFees } from "./Constants";

/**
 * Calculate the interest based on tax collected and the number of months late.
 * @param {number} taxCollected dollar amount to base the interest off
 * @param {number} numberOfMonthsLate number of months the user has failed to pay their tax
 * @param {number} interestRate - interest rate to charge as a decimal
 */
const CalculateInterest = (
  taxCollected,
  numberOfMonthsLate,
  interestRate = RatesAndFees.InterestRate
) => taxCollected * numberOfMonthsLate * interestRate;

/**
 * Calculate the penalty fee based on tax collected.
 * @param {number} taxCollected dollar amount to base the penalty off of
 * @param {number} penaltyRate penalty fee percentage as a decimal
 */
const CalculatePenalty = (
  taxCollected,
  penaltyRate = RatesAndFees.PenaltyRate
) => taxCollected * penaltyRate;

/**
 * Calculate tax collected based on net Room Rental Collections and the current Transient Tax Rate
 * @param {number} netRoomRentalCollections
 */
const CalculateTaxCollected = (
  netRoomRentalCollections,
  taxRate = RatesAndFees.TransientTaxRate
) => netRoomRentalCollections * taxRate;

/**
 * Get a list of calculations based on given Transient Tax Data
 * @param {object} fields the required input fields to calculate totals for transient tax. Fields are grouped by their form name.
 * @param {number} monthsLate number of months tardy on payment, this will determine if penalty and interest is charged
 * @param {number} taxRate rate as decimal
 * @param {number} interestRate rate as decimal
 * @param {number} penaltyRate rate as decimal
 * @returns {object} an object containing all the desired totals
 */
const GetCalculatedTotals = (
  fields = {},
  monthsLate = 0,
  taxRate = RatesAndFees.TransientTaxRate,
  interestRate = RatesAndFees.InterestRate,
  penaltyRate = RatesAndFees.PenaltyRate
) => {
  const {
    grossRentalCollected,
    nonTransientRentalCollected,
    governmentExemptRentalCollected
  } = fields;

  const totalExemptions =
    nonTransientRentalCollected + governmentExemptRentalCollected;
  const netRoomRentalCollections = totalExemptions + grossRentalCollected;
  const transientTaxCollected = CalculateTaxCollected(
    netRoomRentalCollections,
    taxRate
  );

  let transientInterest = 0;
  let transientPenalty = 0;
  let totalInterestAndPenalties = 0;

  if (monthsLate) {
    transientInterest = CalculateInterest(
      transientTaxCollected,
      monthsLate,
      interestRate
    );
    transientPenalty = CalculatePenalty(transientTaxCollected, penaltyRate);
    totalInterestAndPenalties = transientInterest + transientPenalty;
  }

  const monthlyTaxRemitted = transientTaxCollected + totalInterestAndPenalties;

  return {
    totalExemptions,
    netRoomRentalCollections,
    transientTaxCollected,
    transientInterest,
    transientPenalty,
    totalInterestAndPenalties,
    monthlyTaxRemitted
  };
};

export {
  CalculateInterest,
  CalculatePenalty,
  CalculateTaxCollected,
  GetCalculatedTotals
};
