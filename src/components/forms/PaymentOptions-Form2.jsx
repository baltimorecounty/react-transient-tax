import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import ErrorMessage from "../ErrorMessage";
import PaymentOptions from "../PaymentOptions";
import ReturnDateSelector from "../ReturnDateSelector";
import TransientTaxTabs from "../TransientTaxTabs";
import { GetFilingTypes } from "../../services/ApiService";
import { ErrorPath } from "../../common/ErrorUtility";
import * as Yup from "yup";

const PaymentOptionsForm2 = props => {
  const {
    nextButton,
    prevButton,
    onValidSubmission,
    tabs,
    isActiveStep,
    monthsToReport,
    label
  } = props;
  const [filingTypes, setFilingTypes] = useState([]);
  const [paymentInterval, setPaymentInterval] = useState();

  useEffect(() => {
    if (filingTypes.length === 0) {
      GetFilingTypes()
        .then(filingTypes => {
          setFilingTypes(filingTypes);
        })
        .catch(error => {
          props.history.push(ErrorPath(error), { ...error });
        });
    }
  }, [filingTypes, props]);

  const handleOnChange = onClick => {
    setPaymentInterval(onClick.currentTarget.value);
  };

  return (
    <Formik
      initialValues={{ paymentInterval: "", monthsToReport: {} }}
      onSubmit={values => {
        onValidSubmission(values);
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
          <TransientTaxTabs tabs={tabs} activeStep={isActiveStep} />
          <h2>{label}</h2>
          <div className="tt_form-section">
            <ErrorMessage name="paymentInterval" component="div" />
            <PaymentOptions
              filingTypes={filingTypes}
              handleOnChange={handleOnChange}
            />
            {paymentInterval && (
              <React.Fragment>
                <ReturnDateSelector
                  paymentInterval={paymentInterval}
                  filingTypes={filingTypes}
                  tabs={tabs}
                  monthsToReport={monthsToReport}
                />
                <ErrorMessage name="monthsToReport" />
              </React.Fragment>
            )}
          </div>
          {prevButton}
          {nextButton}
        </Form>
      )}
    </Formik>
  );
};

export default PaymentOptionsForm2;
