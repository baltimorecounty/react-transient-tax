import React from "react";
import PaymentOptions from "../PaymentOptions";
import ReturnDateSelector from "../ReturnDateSelector";

const PaymentSelectionSection = ({ paymentInterval, filingTypes }) => (
  <div className="tt_form-section">
    <PaymentOptions filingTypes={filingTypes} />
    {paymentInterval && (
      <ReturnDateSelector
        paymentInterval={paymentInterval}
        filingTypes={filingTypes}
      />
    )}
  </div>
);

export default PaymentSelectionSection;
