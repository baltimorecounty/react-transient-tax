import * as Yup from "yup";

import React, { useState } from "react";

import AddressLookupField from "../../components/formik/AddressLookupField";
import BasicErrorMessage from "../BasicErrorMessage";
import Field from "../formik/Field";
import FormikSubForm from "./FormikSubForm";
import { VerifyAddress } from "../../services/ApiService";

const BasicInformationForm = props => {
  const [isValidAddressMessage, setIsValidAddressMessage] = useState("");

  const ValidateAddress = async addressValue => {
    try {
      const response = await VerifyAddress(addressValue);
      const { Address: { AddressId = 0 } = {} } = response;

      return AddressId;
    } catch (ex) {
      return null;
    }
  };

  const handleAddressChange = () => {
    setIsValidAddressMessage("");
  };

  return (
    <FormikSubForm
      onSubmit={async values => {
        setIsValidAddressMessage("");
        const { businessAddress, businessAddressParts } = values;
        const shouldGeocode = Object.keys(businessAddressParts).length === 0;
        const addressId = shouldGeocode
          ? await ValidateAddress(businessAddress)
          : businessAddressParts.id;

        if (addressId) {
          props.onValidSubmission(values);
        } else {
          setIsValidAddressMessage(
            "Please enter a valid Baltimore County address."
          );
        }
      }}
      validationSchema={Yup.object({
        businessName: Yup.string().required("Required"),
        businessAddress: Yup.string().required(
          "A valid Baltimore County address is required"
        )
      })}
      {...props}
    >
      {formikBag => (
        <div className="tt_form-section">
          <Field
            id="businessName"
            name="businessName"
            type="text"
            label="Business Name"
            autoFocus
          />
          <AddressLookupField
            id="businessAddress"
            name="businessAddress"
            label="Business Address"
            minLength={3}
            onChange={handleAddressChange}
          />
          {isValidAddressMessage && (
            <BasicErrorMessage message={isValidAddressMessage} />
          )}
          {formikBag.isSubmitting ? <p>Validating address...</p> : null}
        </div>
      )}
    </FormikSubForm>
  );
};

export default BasicInformationForm;
