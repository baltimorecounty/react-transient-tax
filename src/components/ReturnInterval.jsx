import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import { addMonths } from "date-fns";
import { GetDueDate } from "../common/DatesUtilities";
import "react-datepicker/dist/react-datepicker.css";

const ReturnInterval = props => {
  const { intervalType } = props;
  const [months, setMonths] = useState({});
  const [dueDate, setDueDate] = useState();
  const isMonthly = intervalType === "monthly";
  const monthsToSelect = new Array(isMonthly ? 1 : 3).fill(
    null
  ); /** 3 months per quarter */

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

    const dueDate = GetDueDate(lastFilingMonth);

    setDueDate(dueDate);
    setMonths(newMonths);
  };

  return (
    <div className="">
      <div className="form-controls">
        <label htmlFor="">Month{isMonthly ? "" : "s"} for Return</label>
        {monthsToSelect.map((month, monthIndex) => {
          return (
            <DatePicker
              key={monthIndex}
              selected={months[monthIndex]}
              onChange={date => handleDateChange(date, monthIndex)}
              selectsStart
              // startDate={startDate}
              // endDate={endDate}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
          );
        })}
      </div>
      <div className="information">
        {dueDate && (
          <p>
            <span className="emphasize">Due Date</span>: {dueDate}
          </p>
        )}
      </div>
    </div>
  );
};

ReturnInterval.propTypes = {
  /** 'monthly' or 'quarterly' which allows us to control the ui accordingly  */
  intervalType: PropTypes.string.isRequired
};

export default ReturnInterval;
