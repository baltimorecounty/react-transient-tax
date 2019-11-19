import React from "react";
import { Field } from "formik";
import { PaymentDirections, PaymentInterval } from "../common/Constants";
import { RadioButton } from "../common/RadioButton";

const { PaymentLabel, PaymentNote } = PaymentDirections;

const PaymentOptions = props => (
  <React.Fragment>
    <p className="tt_label">{PaymentLabel}</p>
    {Object.entries(PaymentInterval).map(([key, value]) => (
      <Field
        key={key}
        component={RadioButton}
        name="paymentInterval"
        id={`radioButton-${key}`}
        label={key}
        value={value}
      />
    ))}
    <p>{PaymentNote}</p>
  </React.Fragment>
);

export default PaymentOptions;
