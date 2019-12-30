import { Formik } from "formik";
import React from "react";
import Step from "./Step";
import TransientTaxTabs from "./TransientTaxTabs";

const MultiPageForm = props => {
  const {
    history,
    stepList,
    match: { params = {} }
  } = props;
  const { stepId = "basic-information" } = params;
  const { steps = [], panelGroups = [] } = stepList;
  const currentStepIndex = steps.findIndex(
    x => x.id.toLowerCase() === stepId.toLowerCase()
  );
  const currentStep = steps[currentStepIndex];
  const { id, stepNumber } = currentStep;
  const isActiveStep = id.toLowerCase() === stepId.toLowerCase();
  const nextStep = stepNumber < steps.length ? stepNumber + 1 : null;
  const prevStep = stepNumber === 1 ? null : stepNumber - 1;
  const isLastStep = stepNumber === steps.length;
  const activeStep = currentStep;
  const activeStepDetails = {
    id,
    stepNumber,
    isActiveStep,
    nextStep,
    prevStep,
    isLastStep
  };

  return (
    <div className="tt_form">
      <TransientTaxTabs
        panelGroups={panelGroups}
        tabs={steps}
        activeStep={activeStep.stepNumber}
      />
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {props => {
          const { id } = activeStep;
          const {
            isLastStep,
            nextStep,
            prevStep,
            isActiveStep
          } = activeStepDetails;
          return (
            <div onSubmit={props.handleSubmit}>
              {id && (
                <Step
                  key={id}
                  {...activeStep}
                  stepList={stepList}
                  isLastStep={isLastStep}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  tabs={steps}
                  activeStep={activeStep.stepNumber}
                  history={history}
                  style={{ display: isActiveStep ? "block" : "none" }}
                />
              )}
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default MultiPageForm;
