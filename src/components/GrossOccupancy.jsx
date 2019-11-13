import CurrencyInput from "react-currency-input";
import { Labels } from "../common/Constants";
import React from "react";

const GrossOccupancy = props => (
  <div className="tt_form-group">
    <label htmlFor="">{Labels.CurrencyInput} </label>
    $<CurrencyInput decimalSeparator="." thousandSeparator="," />
  </div>
);

export default GrossOccupancy;
