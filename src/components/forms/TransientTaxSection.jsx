import React from "react";
import PaymentTotal from "../PaymentTotal";

const TransientTaxSection = ({
  labels: Labels,
  transientTaxCollected,
  transientInterest,
  transientPenalty,
  totalInterestAndPenalties,
  monthlyTaxRemitted
}) => (
  <div className="tt_form-section">
    <h2>{Labels.TransientOccupancyTaxRemittedTitle} (if applicable)</h2>
    <PaymentTotal
      name="transientTaxCollected"
      totals={transientTaxCollected}
      label={Labels.TaxCollected}
    />
    <PaymentTotal
      name="transientTaxInterest"
      totals={transientInterest}
      label={Labels.TaxInterest}
    />
    <PaymentTotal
      name="transientTaxPenalty"
      totals={transientPenalty}
      label={Labels.TaxPenalty}
    />
    <PaymentTotal
      name="totalInterestAndPenalties"
      totals={totalInterestAndPenalties}
      label={Labels.PenaltyInterestTotal}
    />
    <PaymentTotal
      name="monthlyTaxRemitted"
      totals={monthlyTaxRemitted}
      label={Labels.MonthlyTaxRemitted}
    />
  </div>
);

export default TransientTaxSection;
