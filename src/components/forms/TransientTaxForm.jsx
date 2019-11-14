import React from "react";
import * as Yup from "yup";
import { format } from "date-fns";
import { Labels } from "../../common/Constants";
import { ErrorMessage, Field, Form, Formik } from "formik";
import PaymentOptions from "../PaymentOptions";
import ReturnDateSelector from "../ReturnDateSelector";
import PaymentField from "../PaymentField";
import PaymentTotal from "../PaymentTotal";
import { GetCalculatedTotals } from "../../common/Calculations";

const initialValues = {
  accountNumber: "",
  businessName: "",
  address: ""
};

const validationSchema = () => {
  return Yup.object().shape({
    accountNumber: Yup.string()
      .matches(/^[0-9]*$/, "it must be number only")
      .required("Required"),
    businessName: Yup.string()
      .transform(value => (!value ? null : value))
      .required("Required"),
    address: Yup.string().required("Required")
  });
};

const onSubmit = (values, { setSubmitting }) => {
  console.log(values);
  setSubmitting(false);
};

const TransientTaxForm = props => (
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
        totalInterestAndPenalties
      } = GetCalculatedTotals(
        {
          grossOccupancy,
          roomRentalCollectionFromNonTransients,
          governmentOnBusiness
        },
        monthsToReport,
        monthsLate
      );

      const buildMonthLabel = monthIndex => {
        const friendlyMonthLabels = Object.keys(monthsToReport).map(key =>
          format(monthsToReport[key], "M/yy")
        );
        return friendlyMonthLabels[monthIndex];
      };

      return (
        <Form>
          <div className="tt_form-section">
            {/* Basic Information Section */}
            <label htmlFor="accountNumber">Account Number</label>
            <div>
              <Field id="accountNumber" name="accountNumber" type="text" />
              <ErrorMessage name="accountNumber" />
            </div>
            <label htmlFor="businessName">Business Name</label>
            <div>
              <Field id="businessName" name="businessName" type="text" />
              <ErrorMessage name="businessName" />
            </div>
            <label htmlFor="address">Address</label>
            <div>
              <Field id="address" name="address" type="text" />
              <ErrorMessage name="address" />
            </div>
          </div>
          {/* End of Basic Information Section */}
          <div className="tt_form-section">
            <PaymentOptions />
            <ReturnDateSelector paymentInterval={paymentInterval} />
          </div>
          {Object.keys(monthsToReport).length > 0 && (
            <React.Fragment>
              <div className="tt_form-section">
                <PaymentField
                  name="grossOccupancy"
                  label={Labels.GrossOccupancy}
                  monthsToReport={monthsToReport}
                  buildMonthLabel={buildMonthLabel}
                />
              </div>
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
              </div>
              <button type="submit">Submit</button>
            </React.Fragment>
          )}
        </Form>
      );
    }}
  </Formik>
);

export default TransientTaxForm;
