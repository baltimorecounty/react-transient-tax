import React from "react";
import { Field } from "formik";
import { PaymentDirections } from "../common/Constants";
import { RadioButton } from "../common/RadioButton";

const { PaymentLabel, PaymentNote } = PaymentDirections;

const PaymentOptions = ({ filingTypes, handleOnChange }) => {
  return (
    <React.Fragment>
      <p className="tt_label">{PaymentLabel}</p>
      {filingTypes.map(({ Id: key, Description: value }) => (
        <Field
          key={key}
          component={RadioButton}
          name="paymentInterval"
          onClick={handleOnChange}
          id={`radioButton-${key}`}
          label={value}
          value={key}
        />
      ))}
      <p>{PaymentNote}</p>
    </React.Fragment>
  );
};

export default PaymentOptions;
