import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useState } from "react";

import ErrorMessage from "../ErrorMessage";
import ExemptionForm from "./ExemptionForm";
import ExemptionsList from "../ExemptionList";
import { HasAtLeast1Exemption } from "../../common/ExemptionUtilities";
import PromptIfDirty from "../PromptIfDirty";

const ExemptionCertificateForm = props => {
  const {
    nextButton,
    prevButton,
    onValidSubmission,
    formik,
    initialValues
  } = props;
  const { monthlyData = [] } = formik.values;
  const { exemptions: initialExemptions = [] } = initialValues;
  const [exemptions, setExemptions] = useState(initialExemptions);
  const [activeExemption, setActiveExemption] = useState({});

  const editExemption = exemptionToEdit => {
    setActiveExemption({ ...exemptionToEdit });
  };

  const removeExemption = exemptionId => {
    setExemptions(exemptions.filter(exemption => exemption.id !== exemptionId));
  };

  return (
    <React.Fragment>
      <ExemptionForm />
      <Formik
        initialValues={initialValues}
        onSubmit={(values, formikBag) => {
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
        {props => {
          const { setFieldValue } = props;

          const handleExemptionSave = updatedExemptions => {
            setExemptions(updatedExemptions);
            setFieldValue("exemptions", updatedExemptions);
          };

          return (
            <div>
              <Form>
                <PromptIfDirty />
                <div className="form-1">
                  {exemptions.length > 0 && (
                    <ExemptionsList
                      exemptions={exemptions}
                      handleEditClick={editExemption}
                      handleRemoveClick={removeExemption}
                    />
                  )}
                  <ErrorMessage name="exemptions" />
                </div>
                <div className="tt_form-controls">
                  {prevButton}
                  {nextButton}
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default ExemptionCertificateForm;
