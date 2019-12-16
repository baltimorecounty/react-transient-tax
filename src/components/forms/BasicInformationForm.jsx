import React from "react";
import { Formik, Form } from "formik";
import TransientTaxTabs from "../TransientTaxTabs";
import Field from "../Field";
import { VerifyAddress } from "../../services/ApiService";
import AddressLookupField from "../../components/AddressLookupField";

import * as Yup from "yup";

const BasicInformationForm = props => {
  const {
    nextButton,
    prevButton,
    onValidSubmission,
    tabs,
    isActiveStep,
    activeStep,
    label
  } = props;

  return (
    <Formik
      initialValues={{
        businessName: "",
        businessAddress: ""
      }}
      onSubmit={values => {
        onValidSubmission(values);
      }}
      validationSchema={Yup.object({
        businessName: Yup.string()
          .transform(value => (!value ? null : value))
          .required("Required"),
        businessAddress: Yup.mixed()
          .required("Required")
          .test("is-valid-address", "Please enter a valid address.", value => {
            return new Promise(resolve => {
              VerifyAddress(value)
                .then(response => {
                  resolve(
                    response ? (Object.keys(response).length = 1) : false
                  );
                })
                .catch(resolve(false));
            });
          })
      })}
    >
      {props => (
        <Form>
          <TransientTaxTabs
            tabs={tabs}
            isActiveStep={isActiveStep}
            activeStep={activeStep}
          />
          <h2>{label}</h2>
          <div className="tt_form-section">
            <Field
              id="businessName"
              name="businessName"
              type="text"
              label="Business Name"
            />
            <AddressLookupField
              id="businessAddress"
              name="businessAddress"
              label="Business Address"
            />
          </div>
          {prevButton}
          {nextButton}
        </Form>
      )}
    </Formik>
  );
};

export default BasicInformationForm;
