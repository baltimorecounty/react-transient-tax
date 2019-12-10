import React from "react";
import PaymentField from "../PaymentField";
import { connect } from "formik";

/** Note field name "grossRentalCollected" */
const GrossOccupancySection = ({
  label,
  monthsToReport,
  buildMonthLabel,
  form
}) => (
  <div className="tt_form-section">
    <PaymentField
      name="grossRentalCollected"
      label={label}
      monthsToReport={monthsToReport}
      buildMonthLabel={buildMonthLabel}
    />
  </div>
);

export default connect(GrossOccupancySection);
