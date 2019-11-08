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
 * @param {date} date date to base the due date calculation string
 * @returns {string} friendly version of the due date
 */
const GetFormattedDueDate = date => format(GetDueDate(date), dateFormat);

const GetDueDate = date => {
  const nextMonth = addMonths(date, 1);
  return endOfMonth(nextMonth);
};

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
