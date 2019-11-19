import React from "react";
import PaymentOptions from "../PaymentOptions";
import ReturnDateSelector from "../ReturnDateSelector";

const PaymentSelectionSection = ({ paymentInterval }) => (
  <div className="tt_form-section">
    <PaymentOptions />
    <ReturnDateSelector paymentInterval={paymentInterval} />
  </div>
);

export default PaymentSelectionSection;
