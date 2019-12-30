import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

const DateRangeSelector = props => {
  const {
    formikProps,
    name,
    fromDate: fromDateFromProps,
    toDate: toDateFromProps,
    handleChange = () => {}
  } = props;
  const [fromDate, setFromDate] = useState(fromDateFromProps);
  const [toDate, setToDate] = useState(toDateFromProps);
  //const fromDateId = `date-from-selector-${name}`;
  //const toDateId = `date-to-selector-${name}`;
  const fromDateId = `fromDate`;
  const toDateId = `toDate`;
  useEffect(() => {
    const { fromDate, toDate } = props;
    setFromDate(fromDate);
    setToDate(toDate);
  }, [props]);

//const handleFromDateBlur=()=>{
 // formikProps.setFieldTouched(fromDateId,true);
 // console.log('--handleFromDateBlur---');
//};

  const handleFromDateChange = date => {
  //  formik.setFieldValue("isExemptionFormDirty", false);
    setFromDate(date);
    handleChange({
      fromDate: date,
      toDate,
      fromOrTo:1
    });
  };

  const handleToDateChange = date => {
    setToDate(date);
    console.log('--handleToDateChange---');
    handleChange({
      fromDate,
      toDate: date,
      fromOrTo:2
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
