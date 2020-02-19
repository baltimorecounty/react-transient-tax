import { DateTypes, Labels } from "./Constants";
import {
  addMonths,
  differenceInDays,
  differenceInMonths,
  endOfMonth,
  format,
  startOfDay,
  startOfMonth,
  getYear,
  getMonth,
  getDate
} from "date-fns";

const DefaultDateFormat = "MMMM d, yyyy";

/**
 * Get the due date based on a given date.
 * The due date is the end of the next month.
 * @param {date} fillingDate date to base the due date calculation string
 * @returns {date} date version of the due date
 */
const GetDueDate = fillingDate => {
  const nextMonth = addMonths(fillingDate, 1);
  return endOfMonth(nextMonth);
};

/**
 * Get the due date based on a given date.
 * The due date is the end of the next month.
 * @param {date} fillingDate date to base the due date calculation string
 * @returns {string} friendly version of the due date
 */
const GetFormattedDueDate = fillingDate =>
  format(GetDueDate(fillingDate), DefaultDateFormat);

/**
 * Format the date/time based on a given format pattern.
 * @param {date} dateToFormat date to be formatted
 * @param {string} dateFormat date or time format to be returned
 * @returns {string} friendly version of a date
 */
const GetFormatedDateTime = (dateToFormat, dateFormat) => {
  return format(dateToFormat, dateFormat || DefaultDateFormat);
};

/**
 * Gets a friendly message to let us know if the return is late
 * or there is some time left before the due date.
 * @param {date} filingForDate target date for the return
 * @param {date} dateOfFilingDate the date of the return, typically this will be your system time
 * @returns {object} label and message to describe the status of the due date
 */
const GetDueDateStatus = (filingForDate, dateOfFilingDate) => {
  const dueDate = startOfDay(GetDueDate(filingForDate));
  const startDateOfFilingDate = startOfDay(dateOfFilingDate);
  const dateDifference = differenceInDays(dueDate, startDateOfFilingDate);

  if (dateDifference > 0) {
    return {
      dueDate,
      isLate: false,
      value: dateDifference,
      dateType: DateTypes.Day,
      label: Labels.DaysRemaining,
      message: `${dateDifference} day${dateDifference === 1 ? "" : "s"}`
    };
  }

  /**
   * Add since 1 day late is considered 1 month late, but differenceInMonths returns 0 for anything under 1 month
   */
  const monthDifference = differenceInMonths(
    startOfMonth(startDateOfFilingDate),
    startOfMonth(dueDate)
  );

  return {
    dueDate,
    isLate: true,
    value: monthDifference,
    dateType: DateTypes.Month,
    label: Labels.PastDue,
    message: `${monthDifference} month${monthDifference === 1 ? "" : "s"}`
  };
};

const hasExemption = ({
  governmentExemptRentalCollected = 0,
  nonTransientRentalCollected = 0
}) => governmentExemptRentalCollected + nonTransientRentalCollected < 0;

/**
 * Gets the minimum date
 * @param {*} monthlyData
 */
const GetMinExemptionStartDate = (monthlyData = []) => {
  const { month, year } = monthlyData.find(hasExemption);
  return new Date(year, month - 1, 1);
};

/**
 *
 * @param {*} monthlyData
 */
const GetMaxExemptionEndDate = (monthlyData = []) => {
  const { month, year } = monthlyData.filter(hasExemption).pop();
  return endOfMonth(new Date(year, month - 1, 1));
};
const IsDateRangeAtLeast90Days = (fromDate, toDate) =>
  differenceInDays(new Date(getYear(toDate),getMonth(toDate) + 1,getDate(toDate)), new Date(getYear(fromDate),getMonth(fromDate) + 1,getDate(fromDate))) >= 90;

export {
  DefaultDateFormat,
  GetDueDate,
  GetFormattedDueDate,
  GetDueDateStatus,
  GetFormatedDateTime,
  GetMinExemptionStartDate,
  GetMaxExemptionEndDate,
  IsDateRangeAtLeast90Days
};
