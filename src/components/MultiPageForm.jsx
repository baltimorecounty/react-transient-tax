import React, { useState } from "react";

import { Formik } from "formik";
import Step from "./Step";
import TransientTaxTabs from "./TransientTaxTabs";
import { useEffect } from "react";

const MultiPageForm = props => {
  const {
    history,
    stepList,
    match: { params = {} }
  } = props;
  const { activeStepNumber = 1 } = params;
  const currentFormNumber = parseInt(activeStepNumber);
  const { steps = [], panelGroups = [] } = stepList;
  const [activeStep, setActiveStep] = useState({});
  const [activeStepDetails, setActiveStepDetails] = useState({});

  useEffect(() => {
    const { steps } = stepList;
    const currentStep = steps.find(x => x.stepNumber === currentFormNumber);
    const { id, stepNumber } = currentStep;
    const isActiveStep = stepNumber === currentFormNumber;
    const nextStep = stepNumber < steps.length ? stepNumber + 1 : null;
    const prevStep = stepNumber === 1 ? null : stepNumber - 1;
    const isLastStep = stepNumber === steps.length;

    setActiveStep(currentStep);
    setActiveStepDetails({
      id,
      stepNumber,
      isActiveStep,
      nextStep,
      prevStep,
      isLastStep
    });
  }, [currentFormNumber, stepList]);

  const handleNavClick = stepNumber => {
    setActiveStep(stepNumber);
  };

  return (
    <div className="tt_form">
      <TransientTaxTabs
        panelGroups={panelGroups}
        tabs={steps}
        activeStep={currentFormNumber}
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
                  onNextClick={handleNavClick}
                  onPrevClick={handleNavClick}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  tabs={steps}
                  activeStep={currentFormNumber}
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
