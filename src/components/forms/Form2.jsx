import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import PaymentOptions from "../PaymentOptions";
import ReturnDateSelector from "../ReturnDateSelector";
import TransientTaxTabs from "../../components/TransientTaxTabs";
import { GetFilingTypes } from "../../services/ApiService";
import { ErrorPath } from "../../common/ErrorUtility";
import * as Yup from "yup";

const Form2 = props => {
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
      initialValues={{ paymentInterval: "" }}
      onSubmit={values => {
        onValidSubmission(values);
      }}
      validationSchema={Yup.object({
        paymentInterval: Yup.string()
          .transform(value => (!value ? null : value))
          .required("Required")
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
              <ReturnDateSelector
                paymentInterval={paymentInterval}
                filingTypes={filingTypes}
                tabs={tabs}
                monthsToReport={monthsToReport}
              />
            )}
          </div>
          {prevButton}
          {nextButton}
        </Form>
      )}
    </Formik>
  );
};

export default Form2;
