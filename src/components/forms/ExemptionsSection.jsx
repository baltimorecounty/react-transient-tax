import React from "react";
import PaymentField from "../PaymentField";
import PaymentTotal from "../PaymentTotal";
import { connect } from "formik";

const ExemptionsSection = ({
  labels: Labels,
  monthsToReport,
  buildMonthLabel,
  totalExemptions,
  netRoomRentalCollections
}) => (
  <div className="tt_form-section">
    <h3>{Labels.ExemptionTitle} (if applicable)</h3>
    <PaymentField
      isNegativeValue={true}
      name="nonTransientRentalCollected"
      label={Labels.ExemptionOption1}
      monthsToReport={monthsToReport}
      buildMonthLabel={buildMonthLabel}
      className="tt_subtotal-item"
    />
    <PaymentField
      isNegativeValue={true}
      name="governmentExemptRentalCollected"
      label={Labels.ExemptionOption2}
      monthsToReport={monthsToReport}
      buildMonthLabel={buildMonthLabel}
      className="tt_subtotal-item"
    />
    <PaymentTotal
      name="exemptionTotal"
      totals={totalExemptions}
      label={Labels.ExemptionTotal}
      className="tt_subtotal"
    />
    <PaymentTotal
      name="netRoomRentalTotal"
      totals={netRoomRentalCollections}
      label={Labels.NetRoomRentalLabel}
      className="tt_section-total"
    />
  </div>
);

export default connect(ExemptionsSection);
