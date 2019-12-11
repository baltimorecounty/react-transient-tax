import { format } from "date-fns";
import {
  CalculateInterest,
  CalculatePenalty,
  CalculateTaxCollected
} from "../common/Calculations";
import {
  GetDueDateStatus,
  GetFormatedDateTime,
  GetFormattedDueDate
} from "../common/DatesUtilities";
import { FormatCurrency } from "../common/FormatUtilities";

const dateFormat = "MMMM yyyy";
const sumReducer = (accumulator, currentValue) => accumulator + currentValue;

/**
 * Get totals for a month for any number of fields available in the monthly data object
 * @param {array} monthlyData list of objects that contain monthly data
 * @param {array} keys list of keys you wish to use to calculate total
 */
const getTotalsForMonth = (monthlyData = [], keys = []) => {
  const monthlyTotals = monthlyData.map(data => {
    let sum = 0;
    keys.forEach(key => {
      sum += data[key] || 0;
    });
    return sum;
  });
  const shouldAddTotal = monthlyData.length === 3;

  if (shouldAddTotal) {
    monthlyTotals.push(monthlyTotals.reduce(sumReducer));
  }

  return monthlyTotals;
};

/**
 * Sum any number of arrays at each index
 * @param {array} arrays list of arrays that contain numbers
 * Ex. [0, 1] and [1, 2] would return [1, 3]
 * See https://stackoverflow.com/questions/24094466/javascript-sum-two-arrays-in-single-iteration
 * @returns {array} totals for the summed arrays
 */
const sumTotals = (totals = []) => {
  const maxNumberOfItems = totals.reduce(
    (max, xs) => Math.max(max, xs.length),
    0
  );
  const result = Array.from({ length: maxNumberOfItems });
  return result.map((_, i) =>
    totals.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0)
  );
};

/**
 * Gets required date information from a tax return
 * @param {object} param transient tax return object
 * @returns {object} date information values
 */
const getDateInformation = ({
  dateSubmitted: DateSubmitted = new Date(),
  monthlyData = []
}) => {
  const dateSubmitted = DateSubmitted
    ? GetFormatedDateTime(new Date(DateSubmitted), "MMMM dd yyyy")
    : "";
  const isMonthly = Object.keys(monthlyData).length === 1;
  const monthOfReturn = isMonthly ? 0 : 2;
  const dueDate = monthlyData.length
    ? new Date(
        monthlyData[monthOfReturn].month +
          "/01/" +
          monthlyData[monthOfReturn].year
      )
    : "";
  const formattedDueDate = dueDate ? GetFormattedDueDate(dueDate) : "";
  const { isLate, value: monthsLate } = dueDate
    ? GetDueDateStatus(dueDate, new Date(DateSubmitted))
    : {};
  const monthsSubmitted = monthlyData.map(
    ({ month = 0, year = 0 }) =>
      `${format(new Date(year, month, 1), dateFormat)}`
  );

  return {
    dateSubmitted,
    isMonthly,
    dueDate,
    formattedDueDate,
    isLate,
    monthsLate,
    monthsSubmitted
  };
};

/**
 * Formats tax return values summarizing
 * @param {object} taxReturnValues object that contains a list of properties that are each arrays.
 * Each item in the array is broken into it's values for months
 * @returns {array} list of formatted summary objects
 */
const GetReturnSummaryValues = taxReturnValues => {
  const {
    occupancyTaxCollected,
    exemptions,
    netRoomRentals,
    taxCollected,
    penaltiesCollected,
    interestCollected,
    taxRemitted,
    monthsSubmitted
  } = taxReturnValues;

  return [
    { id: 1, key: "Month of Return", value: monthsSubmitted },
    {
      id: 2,
      key: "Occupancy Tax Collected",
      value: occupancyTaxCollected,
      formatFn: FormatCurrency
    },
    { id: 3, key: "Exemptions", value: exemptions, formatFn: FormatCurrency },
    {
      id: 4,
      key: "Net Room Rental Collections",
      value: netRoomRentals,
      formatFn: FormatCurrency
    },
    {
      id: 5,
      key: "Tax Collected",
      value: taxCollected,
      formatFn: FormatCurrency
    },
    {
      id: 6,
      key: "Interest",
      value: interestCollected,
      formatFn: FormatCurrency
    },
    {
      id: 7,
      key: "Penalties",
      value: penaltiesCollected,
      formatFn: FormatCurrency
    },
    {
      id: 8,
      key: "Monthly Tax Remitted",
      value: taxRemitted,
      formatFn: FormatCurrency
    }
  ];
};

/**
 * Maps Transient Tax Form Data to the confirmation page
 * @param {object} taxReturn tax return form data model
 */
const MapResponseDataForTaxReturn = taxReturn => {
  const { monthlyData = [] } = taxReturn;
  const formattedResponse = { ...taxReturn };
  const {
    dateSubmitted,
    isMonthly,
    dueDate,
    formattedDueDate,
    isLate,
    monthsLate,
    monthsSubmitted
  } = getDateInformation(taxReturn);

  /** Get Formatted Date Submitted */
  formattedResponse.DateSubmitted = dateSubmitted;

  if (!isMonthly) {
    monthsSubmitted.push("Total");
  }

  const occupancyTaxCollected = getTotalsForMonth(monthlyData, [
    "grossRentalCollected"
  ]);

  const exemptions = getTotalsForMonth(monthlyData, [
    "governmentExemptRentalCollected",
    "nonTransientRentalCollected"
  ]);

  const netRoomRentals = sumTotals([occupancyTaxCollected, exemptions]);

  const taxCollected = netRoomRentals.map(CalculateTaxCollected);

  const interestCollected = taxCollected.map(tax =>
    isLate ? CalculateInterest(tax, monthsLate) : 0
  );

  const penaltiesCollected = taxCollected.map(tax =>
    isLate ? CalculatePenalty(tax) : 0
  );

  const taxRemitted = sumTotals([
    taxCollected,
    interestCollected,
    penaltiesCollected
  ]);

  const totals = {
    occupancyTaxCollected,
    exemptions,
    netRoomRentals,
    taxCollected,
    penaltiesCollected,
    interestCollected,
    taxRemitted,
    monthsSubmitted,
    dueDate,
    formattedDueDate
  };

  return { ...formattedResponse, ...totals };
};

/**
 * Map exemptions to the Server Model
 * @param {Array} exemptions
 */
const MapExemptionsToServerModel = (exemptions = []) =>
  exemptions.map(({ fromDate: startDate, toDate: endDate, type: typeId }) => ({
    startDate,
    endDate,
    typeId
  }));

/**
 * Map Transient Tax Form Data to Transient Tax Return Server Model for POSTing the data.
 * @param {object} taxReturn transient tax form data
 */
const MapTaxReturnToServerModel = taxReturn => {
  const { exemptions, paymentInterval = 0 } = taxReturn;
  const mappedExemptions = MapExemptionsToServerModel(exemptions);
  return {
    ...taxReturn,
    ...{ exemptions: mappedExemptions },
    ...{ returnType: parseInt(paymentInterval) }
  };
};

export {
  GetReturnSummaryValues,
  MapResponseDataForTaxReturn,
  MapTaxReturnToServerModel
};
