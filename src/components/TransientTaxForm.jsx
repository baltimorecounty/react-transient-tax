import React from "react";
import PaymentOptions from "./PaymentOptions";
import BasicInformation from "./BasicInformation";
import ReturnDateSelector from "./ReturnDateSelector";

const TransientTaxForm = props => (
  <React.Fragment>
    <BasicInformation />
    <PaymentOptions />
    <ReturnDateSelector intervalType="quarterly" />
  </React.Fragment>
);

export default TransientTaxForm;
