import React, { useState } from "react";
import { Field } from "formik";
import { Labels } from "../common/Constants";
import CurrencyInput from "react-currency-input";

const {
  ExemptionTitle,
  ExemptionOption1,
  ExemptionOption2,
  ExemptionTotal
} = Labels;

const Exemptions = props => {
  const [total, setTotal] = useState(0);
  const [exemptionTransient, setExemptionTransient] = useState(0);
  const [exemptionOfficial, setExemptionOfficial] = useState(0);

  const handleExemptionChange = onChange => {
    const { target } = onChange;
    const { value } = target;
    const currentValue = value.replace("$", "");

    if (target.id === "ExemptionTransient") {
      setExemptionTransient(currentValue);
    } else {
      setExemptionOfficial(currentValue);
    }

    setTotal(parseFloat(exemptionTransient) + parseFloat(exemptionOfficial));
  };

  return (
    <React.Fragment>
      <h1>{ExemptionTitle}</h1>
      <div className="tt_exemption-inputs">
        <div className="tt_exemption-options">
          <p>{ExemptionOption1}</p>
          {/* <CurrencyInput
            //prefix="$"
            decimalSeparator="."
            thousandSeparator=","
            precision="2"
            value={exemptionTransient}
            onChangeEvent={handleExemptionChange}
            id="ExemptionTransient"
          /> */}
          <Field
            type="input"
            name="paymentInterval"
            id="ExemptionTransient"
            label={ExemptionOption1}
            onChange={handleExemptionChange}
          />
        </div>
        <div className="tt_exemption-options">
          <p>{ExemptionOption2}</p>
          {/* <CurrencyInput
            //prefix="$"
            decimalSeparator="."
            thousandSeparator=","
            onChangeEvent={handleExemptionChange}
            precision="2"
            value={exemptionOfficial}
            id="ExemptionOfficial"
          /> */}
          <Field
            type="input"
            name="paymentInterval"
            id="ExemptionOfficial"
            label={ExemptionOption1}
            onChange={handleExemptionChange}
          />
        </div>
        <div className="tt_exemption-options tt_exemption-totals">
          <p>{ExemptionTotal}</p>
          <p>${total}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Exemptions;
