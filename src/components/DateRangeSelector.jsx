import React, { useState } from "react";
import DatePicker from "react-datepicker";

const DateRangeSelector = props => {
  const { name, handleChange = () => {} } = props;
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const fromDateId = `date-from-selector-${name}`;
  const toDateId = `date-to-selector-${name}`;

  const handleFromDateChange = date => {
    setFromDate(date);

    handleChange({
      fromDate: date,
      toDate
    });
  };

  const handleToDateChange = date => {
    setToDate(date);

    handleChange({
      fromDate,
      toDate: date
    });
  };

  return (
    <div className="tt_date-rage-selector">
      <label htmlFor={fromDateId}>From: </label>
      <DatePicker
        id={fromDateId}
        name={fromDateId}
        selected={fromDate}
        onChange={handleFromDateChange}
        selectsStart
      />
      <label htmlFor={toDateId}>To: </label>
      <DatePicker
        id={toDateId}
        name={toDateId}
        selected={toDate}
        onChange={handleToDateChange}
        selectsEnd
        startDate={fromDate}
      />
    </div>
  );
};

export default DateRangeSelector;
