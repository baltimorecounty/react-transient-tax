import React from "react";
import { Formik, Form, Field } from "formik";
import { PaymentToggle, PaymentDirections } from "../common/Constants";
import { RadioButton } from "../common/RadioButton";

const { PaymentLabel, PaymentNote } = PaymentDirections;
const {
  PaymentFirstToggleValue,
  PaymentSecondToggleValue,
  PaymentFirstToggleText,
  PaymentSecondToggleText
} = PaymentToggle;

const PaymentOptions = () => (
  <div>
    <p>{PaymentLabel}</p>
    <Formik
      initialValues={{
        radioGroup: ""
      }}
      render={({ values }) => (
        <Form>
          <Field
            component={RadioButton}
            name="paymentoption"
            id="radioOption1"
            label={PaymentFirstToggleText}
            value={PaymentFirstToggleValue}
          />
          <Field
            component={RadioButton}
            name="paymentoption"
            id="radioOption2"
            label={PaymentSecondToggleText}
            value={PaymentSecondToggleValue}
          />
          <p>{PaymentNote}</p>
        </Form>
      )}
    />
  </div>
);

export default PaymentOptions;
