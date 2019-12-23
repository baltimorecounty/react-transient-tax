import * as Yup from "yup";

import { Form, Formik } from "formik";
import { Labels, LabelsWithNotes } from "../../common/Constants";

import { AddOrUpdate } from "../../common/ArrayUtilities";
import { GetCalculatedTotals } from "../../common/Calculations";
import PaymentField from "../../components/PaymentField";
import PaymentTotal from "../PaymentTotal";
import React from "react";

const MonthlyPaymentForm = props => {
  const {
    nextButton,
    prevButton,
    onValidSubmission,
    formik,
    data: { date }
  } = props;

  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const { monthsLate = 0 } = formik.values;

  return (
    <Formik
      initialValues={{
        grossRentalCollected: 0,
        governmentExemptRentalCollected: 0,
        nonTransientRentalCollected: 0
      }}
      onSubmit={values => {
        const { monthlyData: existingMonthlyData = [] } = formik.values;
        const monthlyData = AddOrUpdate(
          existingMonthlyData,
          {
            ...values,
            month,
            year
          },
          data => data.year === year && data.month === month
        );

        onValidSubmission({ monthlyData });
      }}
      validationSchema={Yup.object({
        grossRentalCollected: Yup.number()
          .min(0.01, "Specify an amount for gross occupancy.")
          .required("Required")
      })}
    >
      {props => {
        const { values } = props;
        const {
          grossRentalCollected,
          nonTransientRentalCollected,
          governmentExemptRentalCollected
        } = values;

        const {
          totalExemptions,
          netRoomRentalCollections,
          transientTaxCollected,
          transientInterest,
          transientPenalty,
          totalInterestAndPenalties,
          monthlyTaxRemitted
        } = GetCalculatedTotals(
          {
            grossRentalCollected,
            nonTransientRentalCollected,
            governmentExemptRentalCollected
          },
          monthsLate
        );

        return (
          <Form>
            <div className="tt_form-section">
              <PaymentField
                name="grossRentalCollected"
                label={Labels.GrossOccupancy}
                month={month}
              />
            </div>
            <div className="tt_form-section">
              <h3>{Labels.ExemptionTitle} (if applicable)</h3>
              <PaymentField
                isNegativeValue={true}
                name="nonTransientRentalCollected"
                label={LabelsWithNotes.NonTransientsRentalCollected}
                month={month}
                className="tt_subtotal-item"
              />
              <PaymentField
                isNegativeValue={true}
                name="governmentExemptRentalCollected"
                label={Labels.ExemptionOption2}
                month={month}
                className="tt_subtotal-item"
              />
              <PaymentTotal
                name="exemptionTotal"
                total={totalExemptions}
                label={Labels.ExemptionTotal}
                className="tt_subtotal"
              />
              <PaymentTotal
                name="netRoomRentalTotal"
                total={netRoomRentalCollections}
                label={Labels.NetRoomRentalLabel}
                className="tt_section-total"
              />
            </div>
            <div className="tt_form-section">
              <h3>
                {Labels.TransientOccupancyTaxRemittedTitle} (if applicable)
              </h3>
              <PaymentTotal
                name="transientTaxCollected"
                total={transientTaxCollected}
                label={LabelsWithNotes.TaxCollected}
                className="tt_subtotal"
              />
              <PaymentTotal
                name="transientTaxInterest"
                total={transientInterest}
                label={LabelsWithNotes.TaxInterest}
                className="tt_subtotal-item"
              />
              <PaymentTotal
                name="transientTaxPenalty"
                total={transientPenalty}
                label={LabelsWithNotes.TaxPenalty}
                className="tt_subtotal-item"
              />
              <PaymentTotal
                name="totalInterestAndPenalties"
                total={totalInterestAndPenalties}
                label={Labels.PenaltyInterestTotal}
                className="tt_subtotal"
              />
              <PaymentTotal
                name="monthlyTaxRemitted"
                total={monthlyTaxRemitted}
                label={Labels.MonthlyTaxRemitted}
                className="tt_section-total"
              />
            </div>
            <p className="tt_note">
              <span className="tt_label">Note</span>:{" "}
              {Labels.InterestDisclaimer}
            </p>
            <div className="tt_form-controls">
              {prevButton}
              {nextButton}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MonthlyPaymentForm;
