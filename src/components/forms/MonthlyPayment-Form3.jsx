import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { GetCalculatedTotals } from "../../common/Calculations";
import { Labels } from "../../common/Constants";
import { HasAtLeast1Exemption } from "../../common/ExemptionUtilities";
import PaymentField from "../PaymentField";
import PaymentTotal from "../PaymentTotal";
import TransientTaxTabs from "../TransientTaxTabs";
import { AddOrUpdate } from "../../common/ArrayUtilities";

const MonthlyPaymentForm3 = props => {
  const {
    nextButton,
    prevButton,
    onValidSubmission,
    tabs,
    isActiveStep,
    label,
    formik,
    data: { date = null }
  } = props;

  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const { monthsLate = 0 } = formik.values;

  return (
    <Formik
      initialValues={{
        grossOccupancy: 0,
        governmentOnBusiness: 0,
        roomRentalCollectionFromNonTransients: 0
      }}
      onSubmit={values => {
        const { monthlyData = [] } = formik.values;
        const monthData = {
          ...values,
          month,
          year
        };

        const updatedMonthlyData = AddOrUpdate(
          monthlyData,
          monthData,
          data => data.year === year && data.month === month
        );

        onValidSubmission({
          monthlyData: updatedMonthlyData
        });
      }}
      validationSchema={Yup.object({
        grossOccupancy: Yup.string()
          .transform(value => (!value ? null : value))
          .required("Required"),
        exemptions: Yup.array().when(
          ["governmentOnBusiness", "roomRentalCollectionFromNonTransients"],
          {
            is: (governmentOnBusiness, roomRentalCollectionFromNonTransients) =>
              HasAtLeast1Exemption([
                governmentOnBusiness,
                roomRentalCollectionFromNonTransients
              ]),
            then: Yup.array().min(
              1,
              "At least 1 exemption must be specified when claiming an exemption dollar amount."
            ),
            otherwise: Yup.array().min(0)
          }
        )
      })}
    >
      {props => {
        const { values } = props;
        const {
          grossOccupancy,
          roomRentalCollectionFromNonTransients,
          governmentOnBusiness
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
            grossOccupancy,
            roomRentalCollectionFromNonTransients,
            governmentOnBusiness
          },
          monthsLate
        );

        return (
          <Form>
            <TransientTaxTabs tabs={tabs} activeStep={isActiveStep} />
            <h2>{label}</h2>
            <div className="tt_form-section">
              <PaymentField
                name="grossOccupancy"
                label={Labels.GrossOccupancy}
                date={date}
              />
            </div>
            <div className="tt_form-section">
              <h3>{Labels.ExemptionTitle} (if applicable)</h3>
              <PaymentField
                isNegativeValue={true}
                name="roomRentalCollectionFromNonTransients"
                label={Labels.ExemptionOption1}
                date={date}
                className="tt_subtotal-item"
              />
              <PaymentField
                isNegativeValue={true}
                name="governmentOnBusiness"
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
                label={Labels.TaxCollected}
                className="tt_subtotal"
              />
              <PaymentTotal
                name="transientTaxInterest"
                total={transientInterest}
                label={Labels.TaxInterest}
                className="tt_subtotal-item"
              />
              <PaymentTotal
                name="transientTaxPenalty"
                total={transientPenalty}
                label={Labels.TaxPenalty}
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
            {prevButton}
            {nextButton}
          </Form>
        );
      }}
    </Formik>
  );
};

export default MonthlyPaymentForm3;
