import React from "react";
import { Formik, Form } from "formik";
import { returnConstantItems } from "../common/ReturnConstantValues.js";

const PaymentLabel = returnConstantItems("PaymentDirections", "Label");
const PaymentNote = returnConstantItems("PaymentDirections", "Note");
const PaymentFirstToggleValue = returnConstantItems(
  "PaymentToggle",
  "FirstToggleOption"
);
const PaymentSecondToggleValue = returnConstantItems(
  "PaymentToggle",
  "SecondToggleOption"
);
const PaymentFirstToggleText = returnConstantItems(
  "PaymentToggle",
  "FirstToggleOptionText"
);
const PaymentSecondToggleText = returnConstantItems(
  "PaymentToggle",
  "SecondToggleOptionText"
);

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
