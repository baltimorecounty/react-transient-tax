import React, { useState } from "react";

import { Formik } from "formik";
import Step from "./Step";
import TransientTaxTabs from "./TransientTaxTabs";

const MultiPageForm = props => {
  const {
    history,
    stepList,
    match: { params = {} }
  } = props;
  const { activeStepNumber = 1 } = params;
  const { steps = [], panelGroups = [] } = stepList;
  const [activeStep, setActiveStep] = useState(1);

  const handleNavClick = stepNumber => {
    setActiveStep(stepNumber);
  };

  console.log(activeStepNumber);

  return (
    <div className="tt_form">
      <TransientTaxTabs
        panelGroups={panelGroups}
        tabs={steps}
        activeStep={activeStep}
      />
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
              const { id, stepNumber } = step;
              const isActiveStep = stepNumber === activeStep;
              const nextStep =
                stepNumber < steps.length ? stepNumber + 1 : null;
              const prevStep = stepNumber === 1 ? null : stepNumber - 1;
              const isLastStep = stepNumber === steps.length;
              const tabs = steps;
              return (
                <Step
                  key={id}
                  {...step}
                  stepList={stepList}
                  isLastStep={isLastStep}
                  onNextClick={handleNavClick}
                  onPrevClick={handleNavClick}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  tabs={tabs}
                  activeStep={activeStep}
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
