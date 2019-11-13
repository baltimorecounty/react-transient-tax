import React from "react";
import ReactCurrencyInput from "react-currency-input";

const CurrencyInput = props => {
  const { value, id, onChangeEvent } = props;
  return (
    <ReactCurrencyInput
      prefix="$"
      decimalSeparator="."
      thousandSeparator=","
      precision="2"
      value={value}
      onChangeEvent={onChangeEvent}
      id={id}
    />
  );
};

export default CurrencyInput;
