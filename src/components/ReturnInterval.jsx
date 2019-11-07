import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import { addMonths } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const ReturnInterval = props => {
  const { intervalType } = props;
  const [months, setMonths] = useState({});
  const isMonthly = intervalType === "monthly";
  const monthsToSelect = new Array(isMonthly ? 1 : 3).fill(
    null
  ); /** 3 months per quarter */

  const handleDateChange = (date, monthIndex) => {
    const newMonths = { ...months };
    newMonths[monthIndex] = date;

    // If this is a quartely report, assume the next two months but leave them editable
    if (!isMonthly && monthIndex === 0) {
      newMonths[1] = addMonths(date, 1);
      newMonths[2] = addMonths(date, 2);
    }

    setMonths(newMonths);
  };

  return (
    <div className="">
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
  );
};

ReturnInterval.propTypes = {
  /** 'monthly' or 'quarterly' which allows us to control the ui accordingly  */
  intervalType: PropTypes.string.isRequired
};

export default ReturnInterval;
