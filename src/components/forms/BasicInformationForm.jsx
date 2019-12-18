import React, { useState } from "react";
import { Formik, Form } from "formik";
import TransientTaxTabs from "../TransientTaxTabs";
import Field from "../Field";
import { VerifyAddress } from "../../services/ApiService";
import AddressLookupField from "../../components/AddressLookupField";

import * as Yup from "yup";
import ErrorMessage from "../ErrorMessage";

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

  const [validationMessage, setValidationMessage] = useState("");
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);

  const ValidateAddress = async (addressValue, values) => {
    setIsValidatingAddress(true);
    try {
      const response = await VerifyAddress(addressValue);

      return response.AddressId;
    } catch (ex) {
      return null;
    }
  };

  return (
    <Formik
      initialValues={{
        businessName: "",
        businessAddress: "",
        businessAddressId: "",
        businessAddressParts: {}
      }}
      onSubmit={async (values, formikBag) => {
        const { businessAddress } = values;
        const addressId = await ValidateAddress(businessAddress);

        if (addressId) {
          onValidSubmission(values);
        } else {
          setValidationMessage(
            "Please enter a valid baltimore county address."
          );
          formikBag.setFieldValue("businessAddressId", null);
        }

        setIsValidatingAddress(false);
      }}
      validationSchema={Yup.object({
        businessName: Yup.string()
          .transform(value => (!value ? null : value))
          .required("Required"),
        businessAddress: Yup.mixed().required("Required")
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
            {/* <ErrorMessage name="businessAddressId" /> */}
            {validationMessage && (
              <p role="alert" className="error-message">
                {validationMessage}
              </p>
            )}
            {isValidatingAddress ? <p>Validating address...</p> : null}
          </div>
          {prevButton}
          {nextButton}
        </Form>
      )}
    </Formik>
  );
};

export default BasicInformationForm;
