import React from "react";
import { Formik, Form } from "formik";
import { PaymentToggle, PaymentDirections } from "../common/Constants.js";

const { PaymentLabel, PaymentNote } = PaymentDirections;
const {
  PaymentFirstToggleValue,
  PaymentSecondToggleValue,
  PaymentFirstToggleText,
  PaymentSecondToggleText
} = PaymentToggle;

const PaymentOptions = () => {
  return (
    <Formik>
      <Form>
        <div> {PaymentLabel}</div>
        <input type="radio" name="payoption" value={PaymentFirstToggleValue}>
          {PaymentFirstToggleText}
        </input>
        <br></br>
        <input type="radio" name="payoption" value={PaymentSecondToggleValue}>
          {PaymentSecondToggleText}
        </input>
        <br></br>
        <div>{PaymentNote}</div>
      </Form>
    </Formik>
  );
};

export default PaymentOptions;
