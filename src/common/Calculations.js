import { RatesAndFees } from "./Constants";

const roundCurrency = value => Math.round(value * 100) / 100;

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
) => roundCurrency(taxCollected * numberOfMonthsLate * interestRate);

/**
 * Calculate the penalty fee based on tax collected.
 * @param {number} taxCollected dollar amount to base the penalty off of
 * @param {number} penaltyRate penalty fee percentage as a decimal
 */
const CalculatePenalty = (
  taxCollected,
  penaltyRate = RatesAndFees.PenaltyRate
) => roundCurrency(taxCollected * penaltyRate);

/**
 * Calculate tax collected based on net Room Rental Collections and the current Transient Tax Rate
 * @param {number} netRoomRentalCollections
 */
const CalculateTaxCollected = (
  netRoomRentalCollections,
  taxRate = RatesAndFees.TransientTaxRate
) => roundCurrency(netRoomRentalCollections * taxRate);

/**
 * Get a list of calculations based on given Transient Tax Data
 * @param {object} fields the required input fields to calculate totals for transient tax. Fields are grouped by their form name.
 * @param {number} monthsLate number of months tardy on payment, this will determine if penalty and interest is charged
 * @param {number} taxRate rate as decimal
 * @param {number} interestRate rate as decimal
 * @param {number} penaltyRate rate as decimal
 * @returns {object} an object containing all the desired totals
 */
const GetCalculatedTotals = ({
  fields = {},
  monthsLate = 0,
  taxRate = RatesAndFees.TransientTaxRate,
  interestRate = RatesAndFees.InterestRate,
  penaltyRate = RatesAndFees.PenaltyRate,
  addingOneTimePenalty
}) => {
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

  let transientInterest = monthsLate
    ? CalculateInterest(grossRentalCollected, monthsLate, interestRate)
    : 0;
  let transientPenalty =
    addingOneTimePenalty && monthsLate >= 2
      ? CalculatePenalty(grossRentalCollected, penaltyRate)
      : 0;
  let totalInterestAndPenalties = monthsLate
    ? transientInterest + transientPenalty
    : 0;

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

/**
 * Get totals for a month for any number of fields available in the monthly data object
 * @param {array} monthlyData list of objects that contain monthly data
 * @param {array} keys list of keys you wish to use to calculate total
 */
const GetTotalsForMonth = (monthlyData = [], keys = []) => {
  const monthlyTotals = monthlyData.map(data => {
    let sum = 0;
    keys.forEach(key => {
      sum += data[key] || 0;
    });
    return sum;
  });
  return monthlyTotals;
};

/**
 * Sum any number of arrays at each index
 * @param {array} arrays list of arrays that contain numbers
 * Ex. [0, 1] and [1, 2] would return [1, 3]
 * See https://stackoverflow.com/questions/24094466/javascript-sum-two-arrays-in-single-iteration
 * @returns {array} totals for the summed arrays
 */
const SumTotals = (totals = []) => {
  const maxNumberOfItems = totals.reduce(
    (max, xs) => Math.max(max, xs.length),
    0
  );
  const result = Array.from({ length: maxNumberOfItems });
  return result.map((_, i) =>
    totals.map(xs => xs[i] || 0).reduce((sum, x) => sum + roundCurrency(x), 0)
  );
};

export {
  CalculateInterest,
  CalculatePenalty,
  CalculateTaxCollected,
  GetCalculatedTotals,
  GetTotalsForMonth,
  SumTotals
};
