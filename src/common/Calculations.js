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
 * Gets sum for a given month based on a list of field data
 * @param {array} data list of totals for different fields in the report. Each item is an object that will keys
 * @param {number} monthIndex index of the month that you wish to return
 * @param {function} callback allows you to manipulate the total once the total is calculated
 */
const calculateTotalByMonth = (data, monthIndex, callback = total => total) =>
  callback(
    data.reduce(
      (sum, totals) =>
        (sum += totals && totals[monthIndex] ? totals[monthIndex] : 0),
      0
    )
  );

/**
 * Gets totals for a number of fields grouped by month
 * @param {array} data list of totals for different fields in the report. Each item is an object that will keys
 * that match up with teh number of items to report. Example: an item would contain 3 items for a quarter
 * @param {*} monthsToReport the number of inputs for a corresponding field. Example this value will be 3 for a quarterly form
 * @param {function} totalFn applied once the total has been calculated. Allows us to apply interest and penalties.
 */
const CalculateTotalsPerMonths = (
  data = [],
  monthsToReport,
  totalFn = total => total
) => {
  const total = {};
  Object.keys(monthsToReport).forEach((monthKey, monthIndex) => {
    if (!total[monthIndex]) {
      total[monthIndex] = 0;
    }
    const sum = calculateTotalByMonth(data, monthIndex);
    total[monthIndex] += sum;
  });
  return Object.keys(total).reduce((newObj, key) => {
    newObj[key] = totalFn(total[key]);
    return newObj;
  }, {});
};

/**
 * Get a list of calculations based on given Transient Tax Data
 * @param {object} fields the required input fields to calculate totals for transient tax. Fields are grouped by their form name.
 * @param {number} monthsToReport the number of inputs for a corresponding field. Example this value will be 3 for a quarterly form
 * @param {number} monthsLate number of months tardy on payment, this will determine if penalty and interest is charged
 * @returns {object} an object containing all the desired totals
 */
const GetCalculatedTotals = (fields = {}, monthsToReport, monthsLate = 0) => {
  const {
    grossOccupancy,
    roomRentalCollectionFromNonTransients,
    governmentOnBusiness
  } = fields;

  const totalExemptions = CalculateTotalsPerMonths(
    [roomRentalCollectionFromNonTransients, governmentOnBusiness],
    monthsToReport
  );

  const netRoomRentalCollections = CalculateTotalsPerMonths(
    [totalExemptions, grossOccupancy],
    monthsToReport
  );

  const transientTaxCollected = CalculateTotalsPerMonths(
    [netRoomRentalCollections],
    monthsToReport,
    CalculateTaxCollected
  );

  let transientInterest = {};
  let transientPenalty = {};
  let totalInterestAndPenalties = {};

  if (monthsLate) {
    transientInterest = CalculateTotalsPerMonths(
      [netRoomRentalCollections],
      monthsToReport,
      total => CalculateInterest(total, monthsLate)
    );

    transientPenalty = CalculateTotalsPerMonths(
      [netRoomRentalCollections],
      monthsToReport,
      CalculatePenalty
    );

    totalInterestAndPenalties = CalculateTotalsPerMonths(
      [transientInterest, transientPenalty],
      monthsToReport
    );
  }

  const monthlyTaxRemitted = CalculateTotalsPerMonths(
    [transientTaxCollected, totalInterestAndPenalties],
    monthsToReport
  );

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
  CalculateTotalsPerMonths,
  GetCalculatedTotals
};
