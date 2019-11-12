import React, { useState } from "react";
import { Field } from "formik";
import { Labels } from "../common/Constants";

const {
  ExemptionTitle,
  ExemptionOption1,
  ExemptionOption2,
  ExemptionTotal
} = Labels;

const Exemptions = props => {
  const [total, setTotal] = useState();
  const [exemptionTransient, setexemptionTransient] = useState(0);
  const [exemptionOfficial, setexemptionOfficial] = useState(0);

  const handleOnChange = onChange => {
    const { target } = onChange;

    if (target.id === "ExemptionTransient") {
      setexemptionTransient(target.value);
    } else {
      setexemptionOfficial(target.value);
    }

    setTotal(exemptionTransient + exemptionOfficial);
  };
  return (
    <React.Fragment>
      <h1>{ExemptionTitle}</h1>
      <div className="tt_exemption-inputs">
        <div className="tt_exemption-options">
          <p>{ExemptionOption1}</p>
          <Field
            type="input"
            name="paymentInterval"
            id="ExemptionTransient"
            label={ExemptionOption1}
            onChange={handleOnChange}
          />
        </div>
        <div className="tt_exemption-options">
          <p>{ExemptionOption2}</p>
          <Field
            type="input"
            name="paymentInterval"
            id="ExemptionOfficial"
            label={ExemptionOption1}
            onChange={handleOnChange}
          />
        </div>
        <div className="tt_exemption-options tt_exemption-totals">
          <p>{ExemptionTotal}</p>
          <p>{total}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Exemptions;
