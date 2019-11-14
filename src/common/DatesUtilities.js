import {
  addMonths,
  differenceInDays,
  differenceInMonths,
  endOfMonth,
  format,
  startOfDay
} from "date-fns";
import { Labels, DateTypes } from "./Constants";
const dateFormat = "MMMM d, yyyy";

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
  format(GetDueDate(fillingDate), dateFormat);

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
      isLate: false,
      value: dateDifference,
      dateType: DateTypes.Day,
      label: Labels.DaysRemaining,
      message: `${dateDifference} day${dateDifference === 1 ? "" : "s"}`
    };
  }

  /**
   * Reverse dateOfFilingDate and dueDate from above to give us a positive number
   * Add 1 to ensure that if it's 1 day after the due date it is considered 1 month late
   */
  const monthDifference =
    differenceInMonths(startDateOfFilingDate, dueDate) + 1;

  return {
    isLate: true,
    value: monthDifference,
    dateType: DateTypes.Month,
    label: Labels.PastDue,
    message: `${monthDifference} month${monthDifference === 1 ? "" : "s"}`
  };
};

export { GetDueDate, GetFormattedDueDate, GetDueDateStatus };
