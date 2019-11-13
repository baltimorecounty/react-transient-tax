import React, { useState } from "react";
import { Labels } from "../common/Constants";
import CurrencyInput from "./CurrencyInput";

const {
  ExemptionTitle,
  ExemptionOption1,
  ExemptionOption2,
  ExemptionTotal
} = Labels;

const Exemptions = props => {
  const [exemptionTransient, setExemptionTransient] = useState(0);
  const [exemptionOfficial, setExemptionOfficial] = useState(0);

  const handleExemptionChange = (onChange, currencyValue, currencyAsNumber) => {
    const { target } = onChange;

    if (target.id === "ExemptionTransient") {
      setExemptionTransient(currencyAsNumber);
    } else {
      setExemptionOfficial(currencyAsNumber);
    }
  };

  const total = exemptionTransient + exemptionOfficial;

  return (
    <React.Fragment>
      <h1>{ExemptionTitle}</h1>
      <div className="tt_flex-inputs">
        <div className="tt_flex-options">
          <p>{ExemptionOption1}</p>
          <CurrencyInput
            value={exemptionTransient}
            onChangeEvent={handleExemptionChange}
            id="ExemptionTransient"
          />
        </div>
        <div className="tt_flex-options">
          <p>{ExemptionOption2}</p>
          <CurrencyInput
            value={exemptionOfficial}
            onChangeEvent={handleExemptionChange}
            id="ExemptionOfficial"
          />
        </div>
        <div className="tt_flex-options tt_top-border">
          <p>{ExemptionTotal}</p>
          <p>${total}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Exemptions;
