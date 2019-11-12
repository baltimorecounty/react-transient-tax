import React from "react";
import CurrencyInput from "react-currency-input";
import { Labels } from "../common/Constants";
const GrossOccupancy = props => (
  <React.Fragment>
    <label htmlFor="">{Labels.CurrencyInput} </label>
    $<CurrencyInput decimalSeparator="." thousandSeparator="," />
  </React.Fragment>
);

export default GrossOccupancy;
