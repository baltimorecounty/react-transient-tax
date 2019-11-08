import {
  addMonths,
  differenceInDays,
  differenceInMonths,
  endOfMonth,
  format
} from "date-fns";
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
 * @param {date} dateOfFiling the date of the return, typically this will be your system time
 * @returns {object} label and message to describe the status of the due date
 */
const GetDueDateStatus = (filingForDate, dateOfFiling) => {
  const dueDate = GetDueDate(filingForDate);
  const dateDifference = differenceInDays(dueDate, dateOfFiling);

  if (dateDifference > 0) {
    return {
      label: "Days remaining until due",
      message: `${dateDifference} days`
    };
  }

  /** Reverse dateOfFiling and dueDate from above to give us a positive number */
  const monthDifference = differenceInMonths(dateOfFiling, dueDate);

  return {
    label: "Past Due",
    message: `${monthDifference} months`
  };
};

export { GetDueDate, GetFormattedDueDate, GetDueDateStatus };
