import * as Yup from "yup";
import { Form, Formik } from "formik";
import ErrorMessage from "../formik/ErrorMessage";
import ExemptionCertificateField from "../formik/ExemptionCertificateField";
import { HasAtLeast1Exemption } from "../../common/ExemptionUtilities";
import PromptIfDirty from "../PromptIfDirty";
import React from "react";

const ExemptionCertificateForm = props => {
  const {
    nextButton,
    prevButton,
    onValidSubmission,
    formik,
    initialValues
  } = props;
  const { monthlyData = [] } = formik.values;
  const { exemptions = [] } = initialValues;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
          onValidSubmission(values);
      }}
      validationSchema={Yup.object({
        exemptions: Yup.array().when(
          ["governmentOnBusiness", "roomRentalCollectionFromNonTransients"],
          {
            is: () => HasAtLeast1Exemption(monthlyData),
            then: Yup.array().min(
              1,
              "At least 1 exemption must be specified when claiming an exemption dollar amount. Please enter above."
            ),
            otherwise: Yup.array().min(0)
          }
        )
      })}
    >
      {props => (
        <Form>
          <PromptIfDirty />
          <div className="form-1">
            <ExemptionCertificateField exemptions={exemptions} />
            <ErrorMessage name="exemptions" />
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

export default ExemptionCertificateForm;
