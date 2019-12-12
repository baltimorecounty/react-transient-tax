import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { HasAtLeast1Exemption } from "../../common/ExemptionUtilities";
import ExemptionCertificateField from "../ExemptionCertificateField";
import TransientTaxTabs from "../TransientTaxTabs";
import ErrorMessage from "../ErrorMessage";

const ExemptionCertificateForm4 = props => {
  const {
    nextButton,
    prevButton,
    onValidSubmission,
    tabs,
    isActiveStep,
    activeStep,
    label,
    formik
  } = props;
  const { monthlyData = [] } = formik.values;

  return (
    <Formik
      initialValues={{ exemptions: [] }}
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
          <TransientTaxTabs
            tabs={tabs}
            isActiveStep={isActiveStep}
            activeStep={activeStep}
          />
          <h2>{label}</h2>
          <div className="form-1">
            <ExemptionCertificateField />
            <ErrorMessage name="exemptions" />
          </div>
          {prevButton}
          {nextButton}
        </Form>
      )}
    </Formik>
  );
};

export default ExemptionCertificateForm4;
