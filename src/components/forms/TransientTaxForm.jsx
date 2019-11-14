import React from "react";
import * as Yup from "yup";
import { format } from "date-fns";
import { Labels } from "../../common/Constants";
import { ErrorMessage, Field, Form, Formik } from "formik";
import PaymentOptions from "../PaymentOptions";
import ReturnDateSelector from "../ReturnDateSelector";
import PaymentField from "../PaymentField";
import PaymentTotal from "../PaymentTotal";
import {
  CalculateTaxCollected,
  CalculateInterest,
  CalculatePenalty
} from "../../common/Calculations";

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
        isReturnLate,
        monthsToReport = [],
        paymentInterval,
        monthsLate = 0
      } = values;

      const buildMonthLabel = monthIndex => {
        const friendlyMonthLabels = Object.keys(monthsToReport).map(key =>
          format(monthsToReport[key], "M/yy")
        );
        return friendlyMonthLabels[monthIndex];
      };

      /**
       * Calculate Interest based on the months late
       * @param {number} taxCollected
       */
      const calculateInterestTotal = taxCollected =>
        CalculateInterest(taxCollected, monthsLate);

      const netRoomRentalTotalData = [
        values.governmentOnBusiness,
        values.roomRentalCollectionFromNonTransients,
        values.grossOccupancy
      ];

      /** Only apply penalty if the return is late */
      const penaltyTotalData = isReturnLate ? netRoomRentalTotalData : [];

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
          {paymentInterval && Object.keys(monthsToReport).length > 0 && (
            <React.Fragment>
              <div className="tt_form-section">
                <PaymentField
                  name="grossOccupancy"
                  label={Labels.GrossOccupancy}
                  monthToReport={monthsToReport}
                  buildMonthLabel={buildMonthLabel}
                />
              </div>
              <div className="tt_form-section">
                <h2>{Labels.ExemptionTitle} (if applicable)</h2>
                <PaymentField
                  isNegativeValue={true}
                  name="roomRentalCollectionFromNonTransients"
                  label={Labels.ExemptionOption1}
                  monthToReport={monthsToReport}
                  buildMonthLabel={buildMonthLabel}
                />
                <PaymentField
                  isNegativeValue={true}
                  name="governmentOnBusiness"
                  label={Labels.ExemptionOption2}
                  monthToReport={monthsToReport}
                  buildMonthLabel={buildMonthLabel}
                />
                <PaymentTotal
                  name="exemptionTotal"
                  paymentInterval={paymentInterval}
                  label={Labels.ExemptionTotal}
                  data={[
                    values.governmentOnBusiness,
                    values.roomRentalCollectionFromNonTransients
                  ]}
                />
                <PaymentTotal
                  name="netRoomRentalTotal"
                  paymentInterval={paymentInterval}
                  label={Labels.NetRoomRentalLabel}
                  data={netRoomRentalTotalData}
                />
              </div>
              <div className="tt_form-section">
                <h2>
                  {Labels.TransientOccupancyTaxRemittedTitle} (if applicable)
                </h2>
                <PaymentTotal
                  name="transientTaxCollected"
                  paymentInterval={paymentInterval}
                  label={Labels.TaxCollected}
                  data={penaltyTotalData}
                  totalFn={CalculateTaxCollected}
                />
                {/* <PaymentTotal
                  name="transientTaxInterest"
                  paymentInterval={paymentInterval}
                  label={Labels.TaxInterest}
                  data={penaltyTotalData}
                  totalFn={calculateInterestTotal}
                /> */}
                {/* <PaymentTotal
                  name="transientTaxPenalty"
                  paymentInterval={paymentInterval}
                  label={Labels.TaxPenalty}
                  data={penaltyTotalData}
                  totalFn={CalculatePenalty}
                />
                <PaymentTotal
                  name="totalInterestAndPenalties"
                  paymentInterval={paymentInterval}
                  label={Labels.PenaltyInterestTotal}
                  data={[
                    values.transientTaxInterest,
                    values.transientTaxPenalty
                  ]}
                /> */}
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
