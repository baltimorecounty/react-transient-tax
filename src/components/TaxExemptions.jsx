import React, { useState, useEffect } from "react";
import { Labels } from "../common/Constants";
import { ParseCurrency } from "../common/ParseCurrency";
import CurrencyInput from "react-currency-input";

const {
  ExemptionTitle,
  ExemptionOption1,
  ExemptionOption2,
  ExemptionTotal
} = Labels;

const Exemptions = props => {
  const [exemptionTransient, setExemptionTransient] = useState(0);
  const [exemptionOfficial, setExemptionOfficial] = useState(0);

  const handleExemptionChange = onChange => {
    const { target } = onChange;
    const { value } = target;
    const currentValue = ParseCurrency(value);

    if (target.id === "ExemptionTransient") {
      setExemptionTransient(currentValue);
    } else {
      setExemptionOfficial(currentValue);
    }
  };

  const total = exemptionTransient + exemptionOfficial;

  return (
    <React.Fragment>
      <h1>{ExemptionTitle}</h1>
      <div className="tt_exemption-inputs">
        <div className="tt_exemption-options">
          <p>{ExemptionOption1}</p>
          <CurrencyInput
            prefix="$"
            decimalSeparator="."
            thousandSeparator=","
            precision="2"
            value={exemptionTransient}
            onChangeEvent={handleExemptionChange}
            id="ExemptionTransient"
          />
        </div>
        <div className="tt_exemption-options">
          <p>{ExemptionOption2}</p>
          <CurrencyInput
            prefix="$"
            decimalSeparator="."
            thousandSeparator=","
            precision="2"
            value={exemptionOfficial}
            onChangeEvent={handleExemptionChange}
            id="ExemptionOfficial"
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
