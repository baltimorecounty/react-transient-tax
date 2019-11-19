import React from "react";
import * as Yup from "yup";
import { format } from "date-fns";
import { Labels } from "../../common/Constants";
import { Form, Formik } from "formik";
import PaymentField from "../PaymentField";
import PaymentTotal from "../PaymentTotal";
import ExemptionCertificate from "../ExemptionCertificate";
import { GetCalculatedTotals } from "../../common/Calculations";
import BasicInformationSection from "./BasicInformationSection";
import PaymentSelectionSection from "./PaymentSelectionSection";
import IdentificationSection from "./IdentificationSection";
import GrossOccupancySection from "./GrossOccupancySection";

const initialValues = {
  accountNumber: "",
  businessName: "",
  address: "",
  paymentInterval: "",
  grossOccupancy: 0,
  roomRentalCollectionFromNonTransients: 0,
  governmentOnBusiness: 0,
  exemptions: [],
  monthsLate: 0,
  monthsToReport: {},
  submittedBy: "",
  title: "",
  email: ""
};

const validationSchema = () => {
  return Yup.object().shape({
    accountNumber: Yup.string()
      .matches(/^[0-9]*$/, "it must be number only")
      .required("Required"),
    businessName: Yup.string()
      .transform(value => (!value ? null : value))
      .required("Required"),
    address: Yup.string().required("Required"),
    submittedBy: Yup.string()
      .transform(value => (!value ? null : value))
      .required("Required"),
    title: Yup.string()
      .transform(value => (!value ? null : value))
      .required("Required"),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Please enter your email address.")
  });
};

const onSubmit = (values, { setSubmitting }) => {
  console.log(values);
  setSubmitting(false);
};

const TransientTaxForm = componentProps => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {props => {
      const { values } = props;
      const {
        grossOccupancy,
        roomRentalCollectionFromNonTransients,
        governmentOnBusiness,
        monthsToReport = [],
        paymentInterval,
        monthsLate = 0
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
        monthsToReport,
        monthsLate
      );
      const isPaymentIntervalSelected = Object.keys(monthsToReport).length > 0;
      const hasExemptions = Object.keys(totalExemptions).some(
        exemptionIndex =>
          totalExemptions[exemptionIndex] <
          0 /** exemption totals are negative values */
      );
      const buildMonthLabel = monthIndex => {
        const friendlyMonthLabels = Object.keys(monthsToReport).map(key =>
          format(monthsToReport[key], "M/yy")
        );
        return friendlyMonthLabels[monthIndex];
      };

      return (
        <Form>
          <BasicInformationSection />
          <PaymentSelectionSection paymentInterval={paymentInterval} />
          {isPaymentIntervalSelected && (
            <React.Fragment>
              <GrossOccupancySection
                label={Labels.GrossOccupancy}
                monthsToReport={monthsToReport}
                buildMonthLabel={buildMonthLabel}
              />
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
              <div className="tt_form-section">
                <h2>
                  {Labels.TransientOccupancyTaxRemittedTitle} (if applicable)
                </h2>
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
            </React.Fragment>
          )}
          {hasExemptions && <ExemptionCertificate />}
          {isPaymentIntervalSelected && (
            <React.Fragment>
              <IdentificationSection />
              <button type="submit">Submit</button>
            </React.Fragment>
          )}
        </Form>
      );
    }}
  </Formik>
);

export default TransientTaxForm;
