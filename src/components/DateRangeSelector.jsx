import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import DatePickerField from "./fields/DatePickerField";
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



  return (

  );
};

export default DateRangeSelector;
