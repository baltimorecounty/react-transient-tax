import React, { useContext } from "react";
import { Field } from "formik";
import { PaymentDirections } from "../common/Constants";
import { RadioButton } from "../common/RadioButton";
import { ConstantsContext } from "../context/ConstantsContext";

const { PaymentLabel, PaymentNote } = PaymentDirections;

const PaymentOptions = props => {
  const [{ filingTypes }] = useContext(ConstantsContext);

  return (
    <React.Fragment>
      <p>{PaymentLabel}</p>
      {filingTypes.map(({ Id: key, Description: value }) => (
        <Field
          key={key}
          component={RadioButton}
          name="paymentInterval"
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
