import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import AddressLookupField from "../../components/AddressLookupField";
import { VerifyAddress } from "../../services/ApiService";
import Field from "../Field";
import TransientTaxTabs from "../TransientTaxTabs";
import BasicErrorMessage from "../BasicErrorMessage";

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

  const [isValidAddressMessage, setIsValidAddressMessage] = useState("");
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);

  const ValidateAddress = async addressValue => {
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
        businessAddressParts: {}
      }}
      onSubmit={async values => {
        const { businessAddress, businessAddressParts } = values;
        const shouldGeocode = Object.keys(businessAddressParts).length === 0;
        const addressId = shouldGeocode
          ? await ValidateAddress(businessAddress)
          : businessAddressParts.id;

        if (addressId) {
          setIsValidAddressMessage("");
          onValidSubmission(values);
        } else {
          setIsValidAddressMessage(
            "Please enter a valid Baltimore County address."
          );
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
            {isValidAddressMessage && (
              <BasicErrorMessage message={isValidAddressMessage} />
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
