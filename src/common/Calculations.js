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

const ParseAmountToFloat = amount => {
  return parseFloat(amount.toString().replace(/,/g, ""));
};
const FormatNumber = n => {
  // format number 1000000 to 1,234,567
  return n
    .toString()
    .replace(/^0+/, "")
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const PreserveDecimalFormatNumber = n => {
  return n.toString().indexOf(",") >= 0
    ? n
    : n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const formattedAmount = (value, isNegativeValue) => {
  let fieldValue = 0;
  if (value === "") {
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

    fieldValue = ParseAmountToFloat(fieldValue);
  } else {
    value = value === 0 ? 0 : FormatNumber(value);
    fieldValue = isNegativeValue
      ? -ParseAmountToFloat(value)
      : ParseAmountToFloat(value);
  }
  return [value, fieldValue];
};

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
  penaltyRate = RatesAndFees.PenaltyRate
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

  let transientInterest = 0;
  let transientPenalty = 0;
  let totalInterestAndPenalties = 0;

  if (monthsLate) {
    transientInterest = CalculateInterest(
      transientTaxCollected,
      monthsLate,
      interestRate
    );
    transientPenalty =
      monthsLate >= 2
        ? CalculatePenalty(transientTaxCollected, penaltyRate)
        : 0;
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

/**
 * Get totals for a month for any number of fields available in the monthly data object
 * @param {array} monthlyData list of objects that contain monthly data
 * @param {array} keys list of keys you wish to use to calculate total
 */
const GetTotalsForMonth = (monthlyData = [], keys = []) => {
  const monthlyTotals = monthlyData.map(data => {
    let sum = 0;
    keys.forEach(key => {
      sum += parseFloat(data[key].toString().replace(/,/g, "")) || 0;
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
  SumTotals,
  PreserveDecimalFormatNumber,
  formattedAmount
};
