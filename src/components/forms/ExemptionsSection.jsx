import React from "react";
import PaymentField from "../PaymentField";
import PaymentTotal from "../PaymentTotal";

const ExemptionsSection = ({
  labels: Labels,
  monthsToReport,
  buildMonthLabel,
  totalExemptions,
  netRoomRentalCollections
}) => (
  <div className="tt_form-section">
    <h2>{Labels.ExemptionTitle} (if applicable)</h2>
    <PaymentField
      isNegativeValue={true}
      name="roomRentalCollectionFromNonTransients"
      label={Labels.ExemptionOption1}
      monthsToReport={monthsToReport}
      buildMonthLabel={buildMonthLabel}
    />
    <PaymentField
      isNegativeValue={true}
      name="governmentOnBusiness"
      label={Labels.ExemptionOption2}
      monthsToReport={monthsToReport}
      buildMonthLabel={buildMonthLabel}
    />
    <PaymentTotal
      name="exemptionTotal"
      totals={totalExemptions}
      label={Labels.ExemptionTotal}
    />
    <PaymentTotal
      name="netRoomRentalTotal"
      totals={netRoomRentalCollections}
      label={Labels.NetRoomRentalLabel}
    />
  </div>
);

export default ExemptionsSection;
