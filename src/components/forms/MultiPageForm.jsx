import React, { useState } from "react";
import Step from "../Step";
import { Formik } from "formik";

const MultiPageForm = props => {
  const { history, stepList } = props;
  const { steps } = stepList;
  const [activeStep, setActiveStep] = useState(1);

  const handleNavClick = stepNumber => {
    setActiveStep(stepNumber);
  };

  return (
    <div className="tt_form">
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {props => (
          <div onSubmit={props.handleSubmit}>
            {steps.map(step => {
              const { stepNumber } = step;
              const isActiveStep = stepNumber === activeStep;
              const nextStep =
                stepNumber < steps.length ? stepNumber + 1 : null;
              const prevStep = stepNumber === 1 ? null : stepNumber - 1;
              const isLastStep = stepNumber === steps.length;
              const tabs = steps;
              return (
                <Step
                  key={stepNumber}
                  {...step}
                  stepList={stepList}
                  isLastStep={isLastStep}
                  onNextClick={handleNavClick}
                  onPrevClick={handleNavClick}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  tabs={tabs}
                  isActiveStep={isActiveStep}
                  history={history}
                  style={{ display: isActiveStep ? "block" : "none" }}
                />
              );
            })}
          </div>
        )}
      </Formik>
    </div>
  );
};

export default MultiPageForm;
