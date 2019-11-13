import React from "react";
import CurrencyControl from "./CurrencyControl";

import { Labels } from "../common/Constants";
const GrossOccupancy = props => (
  <React.Fragment>
    <label htmlFor="">{Labels.CurrencyInput} </label>
    <CurrencyControl />
  </React.Fragment>
);

export default GrossOccupancy;
