import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";

const DateRangeSelector = props => {
  const {
    fromDate: fromDateFromProps,
    toDate: toDateFromProps,
    handleChange = () => {},
    onClick = () => {},
    minDate = new Date(),
    maxDate = new Date()
  } = props;
  const [fromDate, setFromDate] = useState(fromDateFromProps);
  const [toDate, setToDate] = useState(toDateFromProps);
  const fromDateId = `fromDate`;
  const toDateId = `toDate`;

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
          onClickOutside={() => onClick(null, fromDateId)}
          minDate={minDate}
          maxDate={maxDate}
          selectsStart
          startDate={minDate}
        />
      </div>
      <div>
        <label htmlFor={toDateId}>To: </label>
        <DatePicker
          id={toDateId}
          name={toDateId}
          selected={toDate}
          onChange={handleToDateChange}
          minDate={minDate}
          maxDate={maxDate}
          selectsEnd
          startDate={fromDate}
          onClickOutside={() => onClick(null, toDateId)}
        />
      </div>
    </div>
  );
};

export default DateRangeSelector;
