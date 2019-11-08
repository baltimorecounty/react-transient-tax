import { addMonths, endOfMonth } from "date-fns";

/**
 * Get the due date based on a given date.
 * The due date is the end of the next month.
 * @param {date} date
 */
const GetDueDate = date => {
  const nextMonth = addMonths(date, 1);
  return endOfMonth(nextMonth);
};

export { GetDueDate };
