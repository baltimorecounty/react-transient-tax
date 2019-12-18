import React, { useState } from "react";
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
        businessAddressId: "none"
      }}
      onSubmit={async values => {
        const { businessAddress } = values;
        const addressID = await ValidateAddress(businessAddress);
        console.log(addressID);

        if (addressID) {
          values.businessAddressId = addressID
          onValidSubmission(values);
        }
        else {
          values.businessAddressId = "";
        }

        setIsValidatingAddress(false);

      }}
      validationSchema={Yup.object({
        businessName: Yup.string()
          .transform(value => (!value ? null : value))
          .required("Required"),
        businessAddress: Yup.mixed()
          .required("Required"),
        businessAddressId: Yup.mixed()
          .required("Please enter a valid Baltimore County address")
        // .test(
        //   "is-valid-address",
        //   "Please enter a valid Baltimore County address.",
        //   addressValue => {
        //     return new Promise(resolve => {
        //       ValidateAddress(addressValue).then(response =>
        //         resolve(!!response)
        //       );
        //       setIsValidatingAddress(false);
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
            <AddressLookupField
              id="businessAddress"
              name="businessAddress"
              label="Business Address"
            />
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
