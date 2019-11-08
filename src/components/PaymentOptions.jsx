import React from "react";
import { Formik, Form, Field } from "formik";
import { PaymentDirections, PaymentInterval } from "../common/Constants";
import { RadioButton } from "../common/RadioButton";

const { PaymentLabel, PaymentNote } = PaymentDirections;

const PaymentOptions = () => (
  <div>
    <p>{PaymentLabel}</p>
    <Formik
      render={() => (
        <Form>
          {Object.entries(PaymentInterval).map(([key, value]) => {
            return (
              <Field
                key={key}
                component={RadioButton}
                name="paymentoption"
                id={`radioButton-${key}`}
                label={key}
                value={value}
              />
            );
          })}
          <p>{PaymentNote}</p>
        </Form>
      )}
    />
  </div>
);

export default PaymentOptions;
