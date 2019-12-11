import React from "react";
import { Formik, Form } from "formik";
import TransientTaxTabs from "../../components/TransientTaxTabs";
import Field from "../Field";
import { GetAddresses } from "../../services/ApiService";
import ErrorMessage from "../ErrorMessage";
import AddressLookupField from "../AddressLookupField";

import * as Yup from "yup";

const BasicInformationForm1 = props => {
  const {
    nextButton,
    prevButton,
    onValidSubmission,
    tabs,
    isActiveStep,
    activeStep,
    label
  } = props;

  Yup.addMethod(Yup.mixed, "businessAddressCheck", function(value) {
    return this.test(
      "address",
      "Please enter your phone number in the following format: 410-555-1212.",
      function(value) {
        if (Object.keys(props.businessAddressParts).length > 0) {
          return GetAddresses(value).then(response => {
            Object.keys(response).length = 1;
          });
        }
      }
    );
  });

  return (
    <Formik
      initialValues={{
        businessName: "",
        businessAddressParts: {},
        businessAddress: ""
      }}
      onSubmit={values => {
        onValidSubmission(values);
      }}
      validationSchema={Yup.object({
        businessName: Yup.string()
          .transform(value => (!value ? null : value))
          .required("Required"),
        businessAddressParts: Yup.mixed().test(
          "has-address",
          "Enter a valid address.",
          value => Object.keys(value).length > 0
        )

        // businessAddress: Yup.mixed().test(
        //   "is-valid-address",
        //   "Test.",
        //   value => {
        //     return new Promise((resolve, reject) => {
        //       GetAddresses(value)
        //         .then(
        //           resolve(response => {
        //             Object.keys(response).length = 1;
        //           })
        //         )
        //         .catch(() => reject(true));
        //     });
        //   }
        // )
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
            <React.Fragment>
              <AddressLookupField
                id="businessAddress"
                name="businessAddress"
                label="Business Address"
              />
              <ErrorMessage name="has-address" />
            </React.Fragment>
          </div>
          {prevButton}
          {nextButton}
        </Form>
      )}
    </Formik>
  );
};

export default BasicInformationForm1;
