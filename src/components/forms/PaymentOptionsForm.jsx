import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import ErrorMessage from "../ErrorMessage";
import { ErrorPath } from "../../common/ErrorUtility";
import { GetFilingTypes } from "../../services/ApiService";
import PaymentOptions from "../PaymentOptions";
import ReturnDateSelector from "../ReturnDateSelector";

const PaymentOptionsForm = props => {
  const {
    nextButton,
    prevButton,
    onValidSubmission,
    tabs,
    monthsToReport,
    history,
    formik
  } = props;
  const {
    paymentInterval: intervalFromFormik,
    monthsToReport: monthsToReportFromFormik = {}
  } = formik.values;
  const [filingTypes, setFilingTypes] = useState([]);
  const [paymentInterval, setPaymentInterval] = useState(intervalFromFormik);

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

  const handleOnChange = onClick => {
    formik.setFieldValue("monthlyData", []);
    formik.setFieldValue("monthsToReport", {});
    formik.setFieldValue("exemptions", []);
    setPaymentInterval(onClick.currentTarget.value);
  };

  return (
    <Formik
      initialValues={{
        paymentInterval: intervalFromFormik,
        monthsToReport: monthsToReportFromFormik
      }}
      onSubmit={values => {
        const { paymentInterval, monthsToReport } = values;
        const hasChange =
          paymentInterval !== intervalFromFormik ||
          monthsToReport !== monthsToReportFromFormik;

        onValidSubmission(values, hasChange);
      }}
      validationSchema={Yup.object({
        paymentInterval: Yup.string()
          .transform(value => (!value ? null : value))
          .required("Required"),
        monthsToReport: Yup.mixed().test(
          "has-months",
          "A date must be selected before you can proceed.",
          value => Object.keys(value).length > 0
        )
      })}
    >
      {props => (
        <Form>
          <div className="tt_form-section">
            <ErrorMessage name="paymentInterval" component="div" />
            <PaymentOptions
              filingTypes={filingTypes}
              handleOnChange={handleOnChange}
              checkedValue={intervalFromFormik}
            />
            {paymentInterval && (
              <React.Fragment>
                <ReturnDateSelector
                  paymentInterval={paymentInterval}
                  filingTypes={filingTypes}
                  tabs={tabs}
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
      )}
    </Formik>
  );
};

export default PaymentOptionsForm;
