import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import { addMonths } from "date-fns";
import {
  GetDueDateStatus,
  GetFormattedDueDate,
  GetFormatedDateTime
} from "../common/DatesUtilities";
import { Labels } from "../common/Constants";
import { GetIdByDescription } from "../common/LookupUtilities";
import { connect } from "formik";

const ReturnInterval = props => {
  const { paymentInterval, filingTypes, formik, tabs } = props;
  const { setFieldValue } = formik;
  const [months, setMonths] = useState({});
  const [dueDate, setDueDate] = useState();
  const [status, setStatus] = useState({});
  const monthlyId = GetIdByDescription(filingTypes, "monthly");
  const isMonthly = parseInt(paymentInterval) === monthlyId;
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

    for (var i = 0; i < tabs.length; i++) {
      tabs[2].isHidden = false;
      tabs[2].label = `Step 3 - ${GetFormatedDateTime(
        date,
        "MMMM"
      )} Tax Return`;

      if (
        paymentInterval === "1" &&
        (tabs[i] === tabs[3] || tabs[i] === tabs[4])
      ) {
        tabs[3].isHidden = false;
        tabs[3].label = `Step 4 - ${GetFormatedDateTime(
          addMonths(date, 1),
          "MMMM"
        )} Tax Return`;

        tabs[4].isHidden = false;
        tabs[4].label = `Step 5 - ${GetFormatedDateTime(
          addMonths(date, 2),
          "MMMM"
        )} Tax Return`;
      }
    }

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

  const getMonth = monthIndex => {
    if (Object.entries(months).length > 0) {
      const month = months[monthIndex];
      return month ? GetFormatedDateTime(new Date(month), "MM/yyyy") : "";
    }
  };

  /** Ensure dates make it to form */
  useEffect(() => {
    setFieldValue("monthsToReport", months);
  }, [months, setFieldValue]);

  useEffect(() => {
    setMonths({});
    setDueDate();
    setStatus({});
  }, [paymentInterval]);

  useEffect(() => {
    const { isLate, value } = status;
    setFieldValue("monthsLate", isLate ? value : 0);
    setFieldValue("isReturnLate", isLate);
  }, [status, setFieldValue]);

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
                {Object.entries(months).length > 0 || monthIndex === 0 ? (
                  <label htmlFor={id}>{getMonthLabel(monthIndex)}</label>
                ) : null}
                {monthIndex === 0 ? (
                  <DatePicker
                    id={id}
                    selected={months[monthIndex]}
                    onChange={date => handleDateChange(date, monthIndex)}
                    startDate={startDate}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                  />
                ) : (
                  <p>{getMonth(monthIndex)}</p>
                )}
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

export default connect(ReturnInterval);
