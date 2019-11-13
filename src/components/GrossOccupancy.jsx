import React from "react";
import CurrencyInput from "./CurrencyInput";

import { Labels } from "../common/Constants";
const GrossOccupancy = props => (
  <React.Fragment>
    <label htmlFor="">{Labels.CurrencyInput} </label>
    <CurrencyInput id="GrossOccupancy" />
  </React.Fragment>
);

export default GrossOccupancy;
