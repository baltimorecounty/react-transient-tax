import React, { Component } from "react";
import CurrencyInput from "react-currency-input";
class GrossOccupancy extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <label htmlFor="">Gross Occupancy Tax Collected</label>
        <CurrencyInput decimalSeparator="." thousandSeparator="," />
      </React.Fragment>
    );
  }
}

export default GrossOccupancy;
