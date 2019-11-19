import React from "react";
import PaymentField from "../PaymentField";

const GrossOccupancySection = ({ label, monthsToReport, buildMonthLabel }) => (
  <div className="tt_form-section">
    <PaymentField
      name="grossOccupancy"
      label={label}
      monthsToReport={monthsToReport}
      buildMonthLabel={buildMonthLabel}
    />
  </div>
);

export default GrossOccupancySection;
