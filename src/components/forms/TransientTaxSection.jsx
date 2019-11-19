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
    <h3>{Labels.TransientOccupancyTaxRemittedTitle} (if applicable)</h3>
    <PaymentTotal
      name="transientTaxCollected"
      totals={transientTaxCollected}
      label={Labels.TaxCollected}
      className="tt_subtotal"
    />
    <PaymentTotal
      name="transientTaxInterest"
      totals={transientInterest}
      label={Labels.TaxInterest}
      className="tt_subtotal-item"
    />
    <PaymentTotal
      name="transientTaxPenalty"
      totals={transientPenalty}
      label={Labels.TaxPenalty}
      className="tt_subtotal-item"
    />
    <PaymentTotal
      name="totalInterestAndPenalties"
      totals={totalInterestAndPenalties}
      label={Labels.PenaltyInterestTotal}
      className="tt_subtotal"
    />
    <PaymentTotal
      name="monthlyTaxRemitted"
      totals={monthlyTaxRemitted}
      label={Labels.MonthlyTaxRemitted}
      className="tt_section-total"
    />
  </div>
);

export default TransientTaxSection;
