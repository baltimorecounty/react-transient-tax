import React from "react";

const CurrencyInput = props => {
  const { autoFocus, isNegativeValue, ...rest } = props;
  return (
    <div className="tt_input--currency">
      <span className="tt_input-prefix">{isNegativeValue ? "-" : ""}$</span>
      <input autoFocus={autoFocus} type="text" data-type="currency" {...rest} />
    </div>
  );
};

export default CurrencyInput;
