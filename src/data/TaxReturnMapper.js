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

const getValue = (monthlyData = [], keys = []) => {
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
 *
 * @param  {...any} arrays
 * See https://stackoverflow.com/questions/24094466/javascript-sum-two-arrays-in-single-iteration
 */
const getValuesFromTotals = (totals = []) => {
  const maxNumberOfItems = totals.reduce(
    (max, xs) => Math.max(max, xs.length),
    0
  );
  const result = Array.from({ length: maxNumberOfItems });
  return result.map((_, i) =>
    totals.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0)
  );
};

const getDateInformation = (data = [], DateSubmitted) => {
  const dateSubmitted = DateSubmitted
    ? GetFormatedDateTime(new Date(DateSubmitted), "MMMM dd yyyy")
    : "";
  const isMonthly = Object.keys(data).length === 1;
  const monthOfReturn = isMonthly ? 0 : 2;
  const dueDate = data.length
    ? new Date(data[monthOfReturn].Month + "/01/" + data[monthOfReturn].Year)
    : "";
  const formattedDueDate = dueDate ? GetFormattedDueDate(dueDate) : "";
  const { isLate, value: monthsLate } = dueDate
    ? GetDueDateStatus(dueDate, new Date(DateSubmitted))
    : {};

  const monthsSubmitted = data.map(
    ({ Month = 0, Year = 0 }) =>
      `${format(new Date(Year, Month, 1), dateFormat)}`
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
  const { DateSubmitted, MonthlyData = [] } = taxReturn;
  const formattedResponse = { ...taxReturn };
  const {
    dateSubmitted,
    isMonthly,
    dueDate,
    formattedDueDate,
    isLate,
    monthsLate,
    monthsSubmitted
  } = getDateInformation(MonthlyData, DateSubmitted);

  /** Get Formatted Date Submitted */
  formattedResponse.DateSubmitted = dateSubmitted;

  if (!isMonthly) {
    monthsSubmitted.push("Total");
  }

  const occupancyTaxCollected = getValue(MonthlyData, ["GrossRentalCollected"]);

  const exemptions = getValue(MonthlyData, [
    "GovernmentExemptRentalCollected",
    "NonTransientRentalCollected"
  ]);

  const netRoomRentals = getValuesFromTotals([
    occupancyTaxCollected,
    exemptions
  ]);

  const taxCollected = netRoomRentals.map(CalculateTaxCollected);

  const interestCollected = taxCollected.map(tax =>
    isLate ? CalculateInterest(tax, monthsLate) : 0
  );

  const penaltiesCollected = taxCollected.map(tax =>
    isLate ? CalculatePenalty(tax) : 0
  );

  const taxRemitted = getValuesFromTotals([
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
