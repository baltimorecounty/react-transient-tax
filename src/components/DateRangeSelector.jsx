import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

const DateRangeSelector = props => {
  const {
    name,
    fromDate: fromDateFromProps,
    toDate: toDateFromProps,
    handleChange = () => {}
  } = props;
  const [fromDate, setFromDate] = useState(fromDateFromProps);
  const [toDate, setToDate] = useState(toDateFromProps);
  const fromDateId = `date-from-selector-${name}`;
  const toDateId = `date-to-selector-${name}`;

  useEffect(() => {
    const { fromDate, toDate } = props;
    setFromDate(fromDate);
    setToDate(toDate);
  }, [props]);

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
      <div>
        <label htmlFor={fromDateId}>From: </label>
        <DatePicker
          id={fromDateId}
          name={fromDateId}
          selected={fromDate}
          onChange={handleFromDateChange}
          selectsStart
        />
      </div>
      <div>
        <label htmlFor={toDateId}>To: </label>
        <DatePicker
          id={toDateId}
          name={toDateId}
          selected={toDate}
          onChange={handleToDateChange}
          minDate={addDays(fromDate, 1)}
          selectsEnd
          startDate={fromDate}
        />
      </div>
    </div>
  );
};

export default DateRangeSelector;
