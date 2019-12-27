import DatePicker from "react-datepicker";
import { Field } from "formik";
import { GetFormatedDateTime } from "../common/DatesUtilities";
import { GetIdByDescription } from "../common/LookupUtilities";
import PropTypes from "prop-types";
import React from "react";
import ReturnStatus from "./ReturnStatus";
import { addMonths } from "date-fns";
import useReturnInterval from "./hooks/useReturnInterval";

const ReturnDateSelector = ({
  field, // { name, value, onChange, onBlur }
  form: { setFieldValue, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { monthsToReport } = values;
  const { id, paymentInterval, filingTypes } = props;
  const [{ months, returnStatus }, setInterval] = useReturnInterval({
    monthsToReport,
    setFieldValue
  });
  const quarterlyId = GetIdByDescription(filingTypes, "quarterly");
  const isQuarterly = parseInt(paymentInterval) === quarterlyId;
  const hasStatus = Object.keys(returnStatus).length > 0;

  /**
   * Handle any of the month / year selection changes
   * @param {date} date js date object for selected month and
   */
  const handleDateChange = date => {
    let newMonths = { 0: date };
    // If this is a quarterly report, assume the next two months but leave them editable
    if (isQuarterly) {
      const nextMonth = addMonths(date, 1);
      const finalMonthInQuarter = addMonths(date, 2);

      newMonths[1] = nextMonth;
      newMonths[2] = finalMonthInQuarter;
    }

    setInterval({ ...newMonths });
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
          id={id}
          selected={months[0] || monthsToReport[0]}
          onChange={handleDateChange}
          startDate={new Date()}
          dateFormat="MM/yyyy"
          monthsToReport={months}
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
