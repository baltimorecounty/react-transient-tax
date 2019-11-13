import "react-datepicker/dist/react-datepicker.css";

import {
  GetDueDateStatus,
  GetFormattedDueDate
} from "../common/DatesUtilities";
import { Labels, PaymentInterval } from "../common/Constants";
import React, { useState } from "react";

import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import { addMonths } from "date-fns";

const ReturnInterval = props => {
  const { paymentInterval } = props;
  const [months, setMonths] = useState({});
  const [dueDate, setDueDate] = useState();
  const [status, setStatus] = useState({});
  const isMonthly =
    paymentInterval && parseInt(paymentInterval) === PaymentInterval.Monthly;
  const monthsToSelect = new Array(isMonthly ? 1 : 3).fill(
    null
  ); /** 3 months per quarter */
  const startDate = new Date();

  /**
   * Handle any of the month / year selection changes
   * @param {date} date js date object for selected month and
   * @param {number} monthIndex tells us which month the
   */
  const handleDateChange = (date, monthIndex) => {
    const newMonths = { ...months };
    const isFirstMonthInQuarter = monthIndex === 0;
    let lastFilingMonth = date;
    newMonths[monthIndex] = date;

    // If this is a quarterly report, assume the next two months but leave them editable
    if (!isMonthly && isFirstMonthInQuarter) {
      const nextMonth = addMonths(date, 1);
      const finalMonthInQuarter = addMonths(date, 2);

      newMonths[1] = nextMonth;
      newMonths[2] = finalMonthInQuarter;
      lastFilingMonth = finalMonthInQuarter;
    }

    const dueDate = GetFormattedDueDate(lastFilingMonth);
    const status = GetDueDateStatus(lastFilingMonth, new Date());

    setStatus(status);
    setDueDate(dueDate);
    setMonths(newMonths);
  };

  /**
   * Gets a friendly label for each month
   * @param {number} monthIndex zero based representation of which month in the sequence it is
   */
  const getMonthLabel = monthIndex => {
    if (isMonthly) {
      return "Month";
    }
    switch (monthIndex) {
      case 0: {
        return "1st Month";
      }
      case 1: {
        return "2nd Month";
      }
      case 2: {
        return "3rd Month";
      }
      default: {
        return;
      }
    }
  };

  if (!paymentInterval) {
    return <p>Please select your payment interval before proceeding.</p>;
  }

  return (
    <React.Fragment>
      <div className="tt_form-group flex-end">
        <label htmlFor="month-date-picker-0">
          Month{isMonthly ? "" : "s"} for Return
        </label>
        <div className="tt_month-pickers">
          {monthsToSelect.map((month, monthIndex) => {
            const id = `month-date-picker-${monthIndex}`;
            return (
              <div className="tt_month-picker" key={monthIndex}>
                <label htmlFor={id}>{getMonthLabel(monthIndex)}</label>
                <DatePicker
                  id={id}
                  selected={months[monthIndex]}
                  onChange={date => handleDateChange(date, monthIndex)}
                  selectsStart
                  startDate={startDate}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                />
              </div>
            );
          })}
        </div>
      </div>
      {dueDate && status.label && (
        <div className="tt_form-group">
          <p>
            <span className="emphasize-text">{Labels.DueDate}</span>: {dueDate}
          </p>
          <p>
            {status.label === Labels.PastDue && (
              <i
                className="fas fa-exclamation-circle tt_past-due-icon"
                aria-hidden="true"
              ></i>
            )}
            <span>{status.label}</span>: {status.message}
          </p>
        </div>
      )}
    </React.Fragment>
  );
};

ReturnInterval.propTypes = {
  /** 'monthly' or 'quarterly' which allows us to control the ui accordingly  */
  paymentInterval: PropTypes.string
};

export default ReturnInterval;
