import {
  BuildMonthlyData,
  GetMonths,
  GetStatus
} from "../../common/ReturnInterval";
import React, { useState } from "react";

import DatePicker from "react-datepicker";
import { Field } from "formik";
import { GetFormatedDateTime } from "../../common/DatesUtilities";
import { GetIdByDescription } from "../../common/LookupUtilities";
import PropTypes from "prop-types";
import ReturnStatus from "../ReturnStatus";

const ReturnDateSelector = ({
  field: { name, value: formValue = {} }, // { name, value, onChange, onBlur }
  form: {
    setFieldValue,
    values: { returnStatus: formReturnStatus = {} }
  }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { id, paymentInterval, filingTypes } = props;
  const [months, setMonths] = useState(formValue);
  const [returnStatus, setReturnStatus] = useState(formReturnStatus);
  const [dateInputValue, setDateInputValue] = useState(months[0] || null);
  const quarterlyId = GetIdByDescription(filingTypes, "quarterly");
  const isQuarterly = parseInt(paymentInterval) === quarterlyId;
  const hasStatus = Object.keys(returnStatus).length > 0;

  /**
   * Handle any of the month / year selection changes
   * @param {date} date js date object for selected month and
   */
  const handleDateChange = date => {
    setDateInputValue(date);

    const newMonths = date ? { ...GetMonths(date, isQuarterly) } : {};
    const hasMonths = Object.keys(newMonths).length > 0;
    const newReturnStatus = hasMonths ? { ...GetStatus(newMonths) } : {};
    const { isLate, value } = newReturnStatus;

    setMonths(newMonths);
    setReturnStatus(newReturnStatus);

    setFieldValue(name, newMonths);
    setFieldValue("returnStatus", newReturnStatus);
    setFieldValue("monthlyData", hasMonths ? BuildMonthlyData(newMonths) : {});
    setFieldValue("monthsLate", hasMonths ? (isLate ? value : 0) : null);
  };

  return (
    <div className="tt_return-date-selector">
      <div className="tt_form-field">
        <label htmlFor={id}>
          Select{" "}
          {isQuarterly
            ? "1st Month of the quarter for your return"
            : " the month of your return"}
        </label>
        <DatePicker
          name={name}
          id={id}
          selected={dateInputValue}
          onChange={handleDateChange}
          startDate={months[0] || new Date()}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
      </div>
      {isQuarterly &&
        Object.keys(months)
          .filter(key => key > 0)
          .map((monthKey, monthIndex) => (
            <div key={monthKey} className="tt_form-group">
              <p className="tt_label">
                {monthIndex === 0 ? "2nd Month" : "3rd Month"}
              </p>
              <p>{GetFormatedDateTime(months[monthKey], "MM/yyyy")}</p>
            </div>
          ))}
      {hasStatus && <ReturnStatus {...returnStatus} />}
    </div>
  );
};

ReturnDateSelector.propTypes = {
  /** 'monthly' or 'quarterly' which allows us to control the ui accordingly  */
  paymentInterval: PropTypes.number
};

const ReturnDateSelectorField = props => (
  <Field component={ReturnDateSelector} {...props} />
);

export default ReturnDateSelectorField;
