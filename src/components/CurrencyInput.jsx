import React from "react";

const CurrencyInput = props => {
  const { autoFocus, isNegativeValue, ...rest } = props;
  return (
    <div className="tt_input--currency">
      <span className="tt_input-prefix">{isNegativeValue ? "-" : ""}$</span>
      <input autoFocus={autoFocus} type="number" step="0.01" {...rest} />
    </div>
  );
};

export default CurrencyInput;
