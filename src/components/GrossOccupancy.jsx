import React from "react";
import CurrencyInput from "./CurrencyInput";
import { Labels } from "../common/Constants";

const GrossOccupancy = props => (
  <div className="tt_form-group">
    <label htmlFor="">{Labels.CurrencyInput} </label>
    <CurrencyInput id="GrossOccupancy" />
  </div>
);

export default GrossOccupancy;
