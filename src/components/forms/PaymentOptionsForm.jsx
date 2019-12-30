import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import ErrorMessage from "../ErrorMessage";
import { ErrorPath } from "../../common/ErrorUtility";
import { GetFilingTypes } from "../../services/ApiService";
import { PaymentDirections } from "../../common/Constants";
import PromptIfDirty from "../PromptIfDirty";
import RadioButtonListField from "../../components/RadioButtonListField";
import ReturnDateSelectorField from "../ReturnDateSelectorField";

const { PaymentLabel, PaymentNote } = PaymentDirections;

const PaymentOptionsForm = props => {
  const {
    nextButton,
    prevButton,
    onValidSubmission,
    history,
    formik,
    initialValues
  } = props;
  const [filingTypes, setFilingTypes] = useState([]);
  const {
    paymentInterval: intervalFromFormik,
    monthsToReport: monthsToReportFromFormik
  } = formik.values;

  useEffect(() => {
    if (filingTypes.length === 0) {
      GetFilingTypes()
        .then(filingTypes => {
          setFilingTypes(filingTypes);
        })
        .catch(error => {
          history.push(ErrorPath(error), { ...error });
        });
    }
  }, [filingTypes, history]);

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
              />
              {paymentInterval && (
                <React.Fragment>
                  <ReturnDateSelectorField
                    id="payment-options-date-selector"
                    paymentInterval={values.paymentInterval}
                    filingTypes={filingTypes}
                    monthsToReport={monthsToReportFromFormik}
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
