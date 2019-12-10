import {
  GetFormattedDueDate,
  GetFormatedDateTime,
  GetDueDateStatus
} from "../common/DatesUtilities";
import { FormatCurrency } from "../common/FormatUtilities";
import {
  CalculatePenalty,
  CalculateInterest,
  CalculateTaxCollected
} from "../common/Calculations";
import { format } from "date-fns";

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

/**
 * Maps Transient Tax Form Data to the confirmation page
 * @param {object} taxReturn tax return form data model
 */
const MapResponseDataForTaxReturn = taxReturn => {
  const { DateSubmitted, MonthlyData = [] } = taxReturn;
  const formattedResponse = { ...taxReturn };

  /** Get Formatted Date Submitted */
  formattedResponse.DateSubmitted = DateSubmitted
    ? GetFormatedDateTime(new Date(DateSubmitted), "MMMM dd yyyy")
    : "";

  const isMonthly = Object.keys(MonthlyData).length === 1;
  const monthOfReturn = isMonthly ? 0 : 2;
  const dueDate = new Date(
    MonthlyData[monthOfReturn].Month + "/01/" + MonthlyData[monthOfReturn].Year
  );
  const formattedDueDate = GetFormattedDueDate(dueDate);
  const { isLate, value: monthsLate } = GetDueDateStatus(
    dueDate,
    new Date(DateSubmitted)
  );

  const monthsSubmitted = MonthlyData.map(
    ({ Month = 0, Year = 0 }) =>
      `${format(new Date(Year, Month, 1), dateFormat)}`
  );

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
  const penaltiesCollected = taxCollected.map(
    isLate ? CalculatePenalty : () => 0
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

export { MapResponseDataForTaxReturn, MapTaxReturnToServerModel };
