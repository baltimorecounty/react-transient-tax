import React from "react";

const PaymentLabel = ({ label }) => {
  const hasNote = typeof label === "object";
  const labelText = hasNote ? label.label : label;

  return (
    <label className="tt_total-label">
      {labelText}
      {hasNote && <span className="tt_total-label_note">{label.note}</span>}
    </label>
  );
};

export default PaymentLabel;
