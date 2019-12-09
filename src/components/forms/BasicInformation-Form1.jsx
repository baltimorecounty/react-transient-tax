import React from "react";
import { Formik, Form } from "formik";
import TransientTaxTabs from "../../components/TransientTaxTabs";
import Field from "../Field";
import AddressLookupField from "../AddressLookupField";

import * as Yup from "yup";

const BasicInformationForm1 = props => {
  const {
    nextButton,
    prevButton,
    onValidSubmission,
    tabs,
    isActiveStep,
    label
  } = props;

  return (
    <Formik
      initialValues={{ businessName: "", address: "" }}
      onSubmit={values => {
        onValidSubmission(values);
      }}
      validationSchema={Yup.object({
        businessName: Yup.string()
          .transform(value => (!value ? null : value))
          .required("Required"),
        address: Yup.string().required("Required")
      })}
    >
      {props => (
        <Form>
          <TransientTaxTabs tabs={tabs} activeStep={isActiveStep} />
          <h2>{label}</h2>
          <div className="tt_form-section">
            <Field
              id="businessName"
              name="businessName"
              type="text"
              label="Business Name"
            />
            <AddressLookupField
              name="businessAddress"
              label="Address Search:"
            />

            {/* {formik.values.address !== "" ? (
              <div>
                <br></br>
                <label id="businessaddress">Business Address</label>
                <div>
                  <label id="address">Address: {formik.values.address}</label>
                </div>
                {formik.values.address2 ? (
                  <div>
                    <label id="address2">
                      Address2: {formik.values.address2}
                    </label>
                  </div>
                ) : null}
                <div>
                  <label id="city">City: {formik.values.city}</label>
                </div>
                <div>
                  <label id="state">State: MD</label>
                </div>
                <div>
                  <label id="zip">Zip Code: {formik.values.zipcode}</label>
                </div>
              </div>
            ) : null} */}
          </div>
          {prevButton}
          {nextButton}
        </Form>
      )}
    </Formik>
  );
};

export default BasicInformationForm1;
