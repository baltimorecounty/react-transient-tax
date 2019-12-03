import React from "react";
import PaymentField from "../PaymentField";
import { connect } from "formik";

const GrossOccupancySection = ({
  label,
  monthsToReport,
  buildMonthLabel,
  form
}) => (
  <div className="tt_form-section">
    <PaymentField
      name="grossOccupancy"
      label={label}
      monthsToReport={monthsToReport}
      buildMonthLabel={buildMonthLabel}
    />
  </div>
);

export default connect(GrossOccupancySection);
