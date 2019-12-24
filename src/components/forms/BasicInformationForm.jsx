import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useState } from "react";

import AddressLookupField from "../../components/AddressLookupField";
import BasicErrorMessage from "../BasicErrorMessage";
import Field from "../Field";
import { VerifyAddress } from "../../services/ApiService";

const BasicInformationForm = props => {
  const { nextButton, prevButton, onValidSubmission, initialValues } = props;

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
      initialValues={initialValues}
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
              minLength={3}
              defaultValue={initialValues.businessAddress}
            />
            {isValidAddressMessage && (
              <BasicErrorMessage message={isValidAddressMessage} />
            )}
            {isValidatingAddress ? <p>Validating address...</p> : null}
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

export default BasicInformationForm;
