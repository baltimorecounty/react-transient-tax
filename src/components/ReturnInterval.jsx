import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReturnInterval = props => {
  const [months, setMonths] = useState({});
  const { intervalType } = props;
  const isMonthly = intervalType === "monthly";
  const monthsToSelect = new Array(isMonthly ? 1 : 3).fill(
    null
  ); /** 3 months per quarter */

  const handleDateChange = (date, monthIndex) => {
    const newMonths = { ...months };
    newMonths[monthIndex] = date;
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
