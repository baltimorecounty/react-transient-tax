import { RatesAndFees } from "./Constants";

/**
 * Calculate the interest based on tax collected and the number of months late.
 * @param {number} taxCollected dollar amount to base the interest off
 * @param {number} numberOfMonthsLate number of months the user has failed to pay their tax
 * @param {number} interest - interest rate to charge as a decimal
 */
const CalculateInterest = (
  taxCollected,
  numberOfMonthsLate,
  interest = RatesAndFees.InterestRate
) => taxCollected * interest * numberOfMonthsLate;

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
const CalculateTaxCollected = netRoomRentalCollections =>
  netRoomRentalCollections * RatesAndFees.TransientTaxRate;

/**
 *
 * @param {*} data
 * @param {*} monthIndex
 * @param {*} callback
 */
const CalculateTotalByMonth = (data, monthIndex, callback = total => total) =>
  callback(
    data.reduce(
      (sum, totals) =>
        (sum += totals && totals[monthIndex] ? totals[monthIndex] : 0),
      0
    )
  );

const CalculateTotalsPerMonths = (data = [], months) => {
  const total = {};
  /** For Each Month */
  for (var i = 0, len = Object.keys(months).length; i < len; i++) {
    if (!total[i]) {
      total[i] = 0;
    }
    const sum = CalculateTotalByMonth(data, i);
    total[i] += sum;
  }
  return Object.keys(total).map(key => ({
    total: total[key],
    label: key
  }));
};

export {
  CalculateInterest,
  CalculatePenalty,
  CalculateTaxCollected,
  CalculateTotalByMonth,
  CalculateTotalsPerMonths
};
