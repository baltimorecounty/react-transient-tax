import React from "react";
import { Formik, Form, Field } from "formik";
import { PaymentDirections, PaymentInterval } from "../common/Constants";
import { RadioButton } from "../common/RadioButton";

const { PaymentLabel, PaymentNote } = PaymentDirections;

const getToggleName = () => {
  Object.entries(PaymentInterval).forEach(([key, value]) => {
    return (
      <Field
        component={RadioButton}
        name="radioGroup"
        id={`radioButton-${key}`}
        label={key}
        value={value}
      />
    );
  });
};

const PaymentOptions = () => (
  <div>
    <p>{PaymentLabel}</p>
    <Formik
      render={() => (
        <Form>
          {getToggleName()}
          <p>{PaymentNote}</p>
        </Form>
      )}
    />
  </div>
);

export default PaymentOptions;
