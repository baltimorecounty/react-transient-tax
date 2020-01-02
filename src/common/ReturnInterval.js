import { GetDueDateStatus } from "./DatesUtilities";
import { addMonths } from "date-fns";

/**
 * Builds the desired structure for storing monthly payment data
 * @param {object} months object that contains hte months we are going to report.
 * Key is the index of the months, the value is an actual date.
 */
const BuildMonthlyData = (months = {}) =>
  Object.keys(months).map(monthKey => {
    const date = months[monthKey];
    return {
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
  });

/**
 * Get months object based on a given date, and whether or not the interval is quarterly.
 * @param {date} date first date in our interval, if quarterly this will be used as the first month in the quarter
 * @param {boolean} isQuarterly tells us whether our object will return 1 date or 3 dates
 * @returns if quarterly an object with 3 properties, if monthly an object with one property
 */
const GetMonths = (date, isQuarterly) => {
  let newMonths = { 0: date };
  // If this is a quarterly report, assume the next two months but leave them editable
  if (isQuarterly) {
    const nextMonth = addMonths(date, 1);
    const finalMonthInQuarter = addMonths(date, 2);

    newMonths[1] = nextMonth;
    newMonths[2] = finalMonthInQuarter;
  }

  return newMonths;
};

/**
 * Get date status information based on a given months object
 * @param {object} months if quarterly an object with 3 properties, if monthly an object with one property
 * @returns an object with import information about the months provided
 */
const GetStatus = months => {
  const isIntervalSelected = Object.keys(months).length > 0;
  if (isIntervalSelected) {
    const lastFilingMonth = months[Object.keys(months).length - 1];
    return GetDueDateStatus(lastFilingMonth, new Date());
  }
  return {};
};

export { BuildMonthlyData, GetMonths, GetStatus };
