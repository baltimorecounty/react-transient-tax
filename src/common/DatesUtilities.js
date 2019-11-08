import { addMonths, endOfMonth, format } from "date-fns";
const dateFormat = "MMMM d, yyyy";

/**
 * Get the due date based on a given date.
 * The due date is the end of the next month.
 * @param {date} date date to base the due date calculation string
 * @returns {string} friendly version of the due date
 */
const GetDueDate = date => {
  const nextMonth = addMonths(date, 1);
  return format(endOfMonth(nextMonth), dateFormat);
};

export { GetDueDate };
