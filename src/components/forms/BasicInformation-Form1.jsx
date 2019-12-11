import React from "react";
import { Formik, Form } from "formik";
import TransientTaxTabs from "../../components/TransientTaxTabs";
import Field from "../Field";
import { GetAddresses } from "../../services/ApiService";
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

  return (
    <Formik
      initialValues={{ businessName: "", businessAddressParts: {} }}
      onSubmit={values => {
        onValidSubmission(values);
      }}
      validationSchema={Yup.object({
        businessName: Yup.string()
          .transform(value => (!value ? null : value))
          .required("Required"),
        businessAddressParts: Yup.mixed()
          .nullable()
          .required()
          .test(
            "has-address",
            "A valid address must be entered",
            value => Object.keys(value).length > 0
            //{
            //   return new Promise((resolve, reject) => {
            //     GetAddresses(businessAddress)
            //       .then(() => resolve(false))
            //       .catch(() => reject(true));
            //   });
            // })
          )
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

export default BasicInformationForm1;
