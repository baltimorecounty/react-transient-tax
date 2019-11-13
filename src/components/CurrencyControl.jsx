import React from "react";
import CurrencyInput from "react-currency-input";

const CurrencyControl = props => {
  const { value, id, onChangeEvent } = props;
  return (
    <React.Fragment>
      <CurrencyInput
        prefix="$"
        decimalSeparator="."
        thousandSeparator=","
        precision="2"
        value={value}
        onChangeEvent={onChangeEvent}
        id={id}
      />
    </React.Fragment>
  );
};

export default CurrencyControl;
