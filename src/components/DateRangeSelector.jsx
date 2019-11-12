import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const DateRangeSelector = props => {
  const { name, handleChange = () => {} } = props;
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const fromDateId = `date-from-selector-${name}`;
  const toDateId = `date-to-selector-${name}`;

  /**
   * Pass values to handler when either date changes
   */
  useEffect(() => {
    handleChange({
      fromDate,
      toDate
    });
  }, [fromDate, toDate]);

  return (
    <div className="tt_date-rage-selector">
      <label htmlFor={fromDateId}>From: </label>
      <DatePicker
        id={fromDateId}
        name={fromDateId}
        selected={fromDate}
        onChange={setFromDate}
        selectsStart
      />
      <label htmlFor={toDateId}>To: </label>
      <DatePicker
        id={toDateId}
        name={toDateId}
        selected={toDate}
        onChange={setToDate}
        selectsEnd
        startDate={fromDate}
      />
    </div>
  );
};

export default DateRangeSelector;
