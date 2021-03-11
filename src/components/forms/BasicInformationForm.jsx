import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useState } from "react";
//import { IEMessage } from "../../common/Constants";
import AddressLookupField from "../../components/formik/AddressLookupField";
import BasicErrorMessage from "../BasicErrorMessage";
import Field from "../formik/Field";
import PromptIfDirty from "../PromptIfDirty";
import { VerifyAddress } from "../../services/ApiService";
import IEMessageAlert from './../IEMessageAlert';

const BasicInformationForm = props => {
  const { nextButton, prevButton, onValidSubmission, initialValues } = props;
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
  const ShowIEMessage = () => {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
      // If Internet Explorer, return true
      return false; //  change it to "true" after testing because i am testing in non IE browser
    } // If another browser, return false
    else {
      return true; //  change it to "false" after testing because i am testing in non IE browser
    }
  };
  const isItIEBrowser = ShowIEMessage();
  //const { IEMessageLabel } = IEMessage;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async values => {
        setIsValidAddressMessage("");
        const { businessAddress, address } = values;
        const shouldGeocode = Object.keys(address).length === 0;
        const addressId = shouldGeocode
          ? await ValidateAddress(businessAddress)
          : address.AddressId;
        if (addressId) {
          onValidSubmission(values);
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
    >
      {props => (
        <Form>
          <PromptIfDirty />
          <IEMessageAlert isItIEBrowser={isItIEBrowser}/>
          <div className="tt_form-section">
            {/* {isItIEBrowser && (
              <div class="alert alert-warning" role="alert">
                {IEMessageLabel}
              </div>
            )} */}
            <Field
              id="tradeAlias"
              name="tradeAlias"
              type="text"
              label="Trade Alias"
              autoFocus
            />
            <Field
              id="tradeAliasAddress"
              name="tradeAliasAddress"
              type="text"
              label="Trade Alias Address"
              autoFocus
            />
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
            {props.isSubmitting ? <p>Validating address...</p> : null}
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
