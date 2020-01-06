import * as Yup from "yup";

import { BuildMonthlyData } from "../../common/ReturnInterval";
import ErrorMessage from "../formik/ErrorMessage";
import FormikSubForm from "./FormikSubForm";
import { GetIdByDescription } from "../../common/LookupUtilities";
import { PaymentDirections } from "../../common/Constants";
import RadioButtonListField from "../../components/formik/RadioButtonListField";
import React from "react";
import ReturnDateSelectorField from "../formik/ReturnDateSelectorField";
import useFilingTypes from "../hooks/useFilingTypes";

const { PaymentLabel, PaymentNote } = PaymentDirections;

const PaymentOptionsForm = props => {
  const filingTypes = useFilingTypes();
  const quarterlyId = GetIdByDescription(filingTypes, "quarterly");

  const { onValidSubmission, formik } = props;

  const {
    paymentInterval: intervalFromFormik,
    monthsToReport: monthsToReportFromFormik
  } = formik.values;

  return (
    <FormikSubForm
      onSubmit={values => {
        const {
          paymentInterval,
          monthsToReport: { months }
        } = values;
        const hasChange =
          paymentInterval !== intervalFromFormik ||
          months !== monthsToReportFromFormik;

        const monthlyData =
          Object.keys(months).length > 0 ? BuildMonthlyData(months) : {};

        onValidSubmission({ ...values, ...{ monthlyData } }, hasChange);
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
      {...props}
    >
      {({ values, setFieldValue }) => {
        const { paymentInterval } = values;
        const isQuarterly = paymentInterval === quarterlyId;

        const handleIntervalChange = () => {
          setFieldValue("exemptions", [], false);
          setFieldValue("monthlyData", []);
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
        );
      }}
    </FormikSubForm>
  );
};

export default PaymentOptionsForm;
