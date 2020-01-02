import * as Yup from "yup";

import { Form, Formik } from "formik";

import ErrorMessage from "../formik/ErrorMessage";
import { PaymentDirections } from "../../common/Constants";
import PromptIfDirty from "../PromptIfDirty";
import RadioButtonListField from "../../components/formik/RadioButtonListField";
import React from "react";
import ReturnDateSelectorField from "../formik/ReturnDateSelectorField";
import useFilingTypes from "../hooks/useFilingTypes";

const { PaymentLabel, PaymentNote } = PaymentDirections;

const PaymentOptionsForm = props => {
  const filingTypes = useFilingTypes();
  const {
    nextButton,
    prevButton,
    onValidSubmission,
    formik,
    initialValues
  } = props;

  const {
    paymentInterval: intervalFromFormik,
    monthsToReport: monthsToReportFromFormik
  } = formik.values;

  /** Reset these values, as they do not apply when interval changes */
  const resetGlobalFormValues = () => {
    formik.setFieldValue("monthlyData", []);
    formik.setFieldValue("exemptions", []);
    formik.setFieldValue("monthsToReport", {});
    formik.setFieldValue("returnStatus", {});
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        const { paymentInterval, monthsToReport } = values;
        const hasChange =
          paymentInterval !== intervalFromFormik ||
          monthsToReport !== monthsToReportFromFormik;

        onValidSubmission(values, hasChange);
      }}
      validationSchema={Yup.object({
        paymentInterval: Yup.number().required(
          "A payment interval must be selected before you proceed."
        ),
        monthsToReport: Yup.mixed().test(
          "has-months",
          "A date must be selected before you can proceed.",
          value => Object.keys(value).length > 0
        )
      })}
    >
      {({ values, setFieldValue }) => {
        const { paymentInterval } = values;

        const handlePaymentIntervalChange = () => {
          setFieldValue("monthsToReport", {});
          setFieldValue("returnStatus", {});
          resetGlobalFormValues();
        };

        return (
          <Form>
            <PromptIfDirty />
            <div className="tt_form-section">
              <RadioButtonListField
                name="paymentInterval"
                items={filingTypes}
                onChange={handlePaymentIntervalChange}
                label={PaymentLabel}
                note={PaymentNote}
                autoFocus
              />
              {paymentInterval && (
                <React.Fragment>
                  <ReturnDateSelectorField
                    name="monthsToReport"
                    id="payment-options-date-selector"
                    paymentInterval={values.paymentInterval}
                    filingTypes={filingTypes}
                  />
                  <ErrorMessage name="monthsToReport" />
                </React.Fragment>
              )}
            </div>
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

export default PaymentOptionsForm;
