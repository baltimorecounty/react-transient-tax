import { Field, connect } from "formik";
import React, { useState } from "react";

import CurrencyInput from "../CurrencyInput";
import ErrorMessage from "./ErrorMessage";
import PaymentLabel from "../PaymentLabel";
import PropTypes from "prop-types";
import classnames from "classnames";
import { FormatCurrency } from "../../common/FormatUtilities";
import { FormatNumber } from "../../common/Calculations";
const CustomInputComponent = ({
  field: { name, value: formValue }, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const ParseAmountToFloat = amount => {
    return parseFloat(amount.toString().replace(/,/g, ""));
  };

  const { className, isNegativeValue, label, autoFocus } = props;
  const month = props.date.getMonth();
  const { setFieldValue } = form;
  const [value, setValue] = useState(Math.abs(formValue));
  const cssClasses = classnames(
    "tt_form-group flex-end total input",
    className
  );
  // function formatNumber(n) {
  //   // format number 1000000 to 1,234,567
  //   return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }
  const handleChange = formattedNumber => {
    console.log("in handleChange");
    /** IE 11 valueAsNumber does not work, so we have to use the string "value" from the target */
    // const { value, valueAsNumber } = formattedNumber.target;

    var value = formattedNumber.target.value.trim();
    var orgValue = formattedNumber.target.value.trim();
    // const currencyValue = valueAsNumber || parseFloat(value);
    //const currencyValue = FormatCurrency(currencyValue1);

    console.log("orgValue:" + orgValue);
    if (value === "" || value === "0") {
      setValue("");
      setFieldValue(name, "0");
      return;
    }
    //original length
    // console.log("original_length:" + value.length);

    if (value.indexOf(".") >= 0) {
      var decimal_pos = value.indexOf(".");
      var left_side = value.substring(0, decimal_pos);
      var right_side = value.substring(decimal_pos);
      var fieldValue;
      if (left_side.length > 0) {
        value =
          FormatNumber(left_side) +
          "." +
          FormatNumber(right_side).substring(0, 2);
        fieldValue = !value ? 0 : isNegativeValue ? -value : value;
      } else {
        var rightSideLength = right_side.length;
        var changeValue = "." + FormatNumber(right_side).substring(0, 2);
        fieldValue = rightSideLength === 1 ? 0 : changeValue;
        value = rightSideLength === 1 ? value : changeValue;
      }
      setValue(value);
      setFieldValue(name, fieldValue);
    } else {
      // value = formatNumber(value);
      console.log("name--Value:" + name + "--" + value);
      setValue(value);
      // const { value1, valueAsNumber1 } = formattedNumber.target;
      //const currencyValue1 = valueAsNumber1 || parseFloat(value1);
      //console.log("currencyValue1:" + currencyValue1);
      let parseAmount = ParseAmountToFloat(value);
      setFieldValue(
        name,
        !value ? 0 : isNegativeValue ? -parseAmount : parseAmount
      );
    }
    // console.log("!value:" + !value);

    //  console.log('!currencyValue:' + !currencyValue);
    //  console.log('Math.abs(currencyValue):' + currencyValue)

    // setValue(!currencyValue ? undefined : Math.abs(currencyValue));
    // setValue(!currencyValue ? undefined : currencyValue);
    // setFieldValue(
    //   name,
    //   !currencyValue ? 0 : isNegativeValue ? -currencyValue : currencyValue
    // );
  };
  // console.log("value:" + value);

  // var number =
  //   value.toString().length > 0
  //     ? Number(value.toString().replace(/,/g, ""))
  //     : 0;
  // var constnumber = 0.08;
  // if (number >= constnumber) {
  //   console.log("number is greater than .08");
  // } else {
  //   console.log("number is  less than  .08");
  // }
  console.log("value:" + value);
  console.log(value);

  return (
    <div className={cssClasses}>
      <PaymentLabel label={label} />
      <div className="tt_currency-pickers">
        <div className="tt_currency-picker">
          <CurrencyInput
            isNegativeValue={isNegativeValue}
            id={`${name}-${month}`}
            name={name}
            onChange={handleChange}
            value={value !== 0 ? FormatNumber(value) : ""} // || ""}
            autoFocus={autoFocus}
          />
          <ErrorMessage name={name} />
        </div>
      </div>
    </div>
  );
};

const PaymentField = props => (
  <Field component={CustomInputComponent} {...props} />
);

PaymentField.propTypes = {
  /** Determines if the input should be treated as a negative or positive currency. */
  isNegativeValue: PropTypes.bool,
  /** General label to describe the input(s). */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

export default connect(PaymentField);
