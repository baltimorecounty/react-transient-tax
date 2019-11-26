import {
  addMonths,
  differenceInDays,
  differenceInMonths,
  endOfMonth,
  format,
  startOfDay,
  isEqual
} from "date-fns";
import { Labels, DateTypes } from "./Constants";
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
  const isFilingDateEndOfMonth = isEqual(
    startOfDay(endOfMonth(dateOfFilingDate)),
    startDateOfFilingDate
  );
  const dateDifference = differenceInDays(dueDate, startDateOfFilingDate);

  if (dateDifference > 0) {
    return {
      isLate: false,
      value: dateDifference,
      dateType: DateTypes.Day,
      label: Labels.DaysRemaining,
      message: `${dateDifference} day${dateDifference === 1 ? "" : "s"}`
    };
  }

  /**
   * Person will only be charged if it's the last day of the month.
   * The ternary adds 1 to the difference in this case, to ensure they are charged.
   */
  const monthDifference =
    differenceInMonths(startDateOfFilingDate, dueDate) +
    (isFilingDateEndOfMonth ? 1 : 0);

  return {
    isLate: true,
    value: monthDifference,
    dateType: DateTypes.Month,
    label: Labels.PastDue,
    message: `${monthDifference} month${monthDifference === 1 ? "" : "s"}`
  };
};

export {
  DefaultDateFormat,
  GetDueDate,
  GetFormattedDueDate,
  GetDueDateStatus,
  GetFormatedDateTime
};
