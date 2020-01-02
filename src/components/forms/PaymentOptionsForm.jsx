import * as Yup from "yup";

import { Form, Formik } from "formik";

import { BuildMonthlyData } from "../../common/ReturnInterval";
import ErrorMessage from "../formik/ErrorMessage";
import { GetIdByDescription } from "../../common/LookupUtilities";
import { PaymentDirections } from "../../common/Constants";
import PromptIfDirty from "../PromptIfDirty";
import RadioButtonListField from "../../components/formik/RadioButtonListField";
import React from "react";
import ReturnDateSelectorField from "../formik/ReturnDateSelectorField";
import useFilingTypes from "../hooks/useFilingTypes";

const { PaymentLabel, PaymentNote } = PaymentDirections;

const PaymentOptionsForm = props => {
  const filingTypes = useFilingTypes();
  const quarterlyId = GetIdByDescription(filingTypes, "quarterly");

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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        const {
          paymentInterval,
          monthsToReport: { months }
        } = values;
        const hasChange =
          paymentInterval !== intervalFromFormik ||
          months !== monthsToReportFromFormik;

        if (hasChange) {
          formik.setFieldValue(
            "monthlyData",
            Object.keys(months).length > 0 ? BuildMonthlyData(months) : {}
          );
        }

        onValidSubmission(values, hasChange);
      }}
      validationSchema={Yup.object({
        paymentInterval: Yup.number().required(
          "A payment interval must be selected before you proceed."
        ),
        monthsToReport: Yup.mixed().test(
          "has-months",
          "A date must be selected before you can proceed.",
          ({ months = {} }) => Object.keys(months).length > 0
        )
      })}
    >
      {({ values, setFieldValue }) => {
        const { paymentInterval } = values;
        const isQuarterly = paymentInterval === quarterlyId;

        const handleIntervalChange = () => {
          setFieldValue(
            "monthsToReport",
            {
              months: {},
              returnStatus: {},
              intervalDate: null
            },
            false
          );
        };

        return (
          <Form>
            <PromptIfDirty />
            <div className="tt_form-section">
              <RadioButtonListField
                name="paymentInterval"
                items={filingTypes}
                label={PaymentLabel}
                note={PaymentNote}
                onChange={handleIntervalChange}
                autoFocus
              />
              {paymentInterval && (
                <React.Fragment>
                  <ReturnDateSelectorField
                    name="monthsToReport"
                    id="payment-options-date-selector"
                    isQuarterly={isQuarterly}
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
