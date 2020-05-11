import * as Yup from "yup";

import { Form, Formik } from "formik";
import { Labels, LabelsWithNotes } from "../../common/Constants";

import { AddOrUpdate } from "../../common/ArrayUtilities";
import { GetCalculatedTotals } from "../../common/Calculations";
import PaymentField from "../../components/formik/PaymentField";
import PaymentTotal from "../PaymentTotal";
import PromptIfDirty from "../PromptIfDirty";
import React from "react";

const getExistingValues = (data = [], filter = () => {}) => data.find(filter);

const MonthlyPaymentForm = props => {
  const {
    initialValues: initialValuesFromProps,
    nextButton,
    prevButton,
    onValidSubmission,
    formik,
    data: { date }
  } = props;

  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const { returnStatus: { isLate, value: monthsLate = 0 } = {} } =
    formik.values.monthsToReport || {};

  const existingValues = getExistingValues(
    formik.values.monthlyData,
    data => data.year === year && data.month === month
  );
  const initialValues = { ...initialValuesFromProps, ...existingValues };

  return (
    <Formik
      initialValues={initialValues}
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
        grossRentalCollected: Yup.string()
          .test(`test-name`, `Specify an amount for gross occupancy.`, function(
            value
          ) {
            return (value !== undefined
              ? Number(value.toString().replace(/,/g, ""))
              : 0) >= 0.01
              ? true
              : false;
          })
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
        } = GetCalculatedTotals({
          fields: {
            grossRentalCollected,
            nonTransientRentalCollected,
            governmentExemptRentalCollected
          },
          monthsLate: isLate ? monthsLate : 0
        });
        return (
          <Form>
            <PromptIfDirty />
            <div className="tt_form-section">
              <PaymentField
                name="grossRentalCollected"
                label={Labels.GrossOccupancy}
                date={date}
                autoFocus
              />
            </div>
            <div className="tt_form-section">
              <h3>{Labels.ExemptionTitle} (if applicable)</h3>
              <PaymentField
                isNegativeValue={true}
                name="nonTransientRentalCollected"
                label={LabelsWithNotes.NonTransientsRentalCollected}
                date={date}
                className="tt_subtotal-item"
              />
              <PaymentField
                isNegativeValue={true}
                name="governmentExemptRentalCollected"
                label={Labels.ExemptionOption2}
                date={date}
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
