import React, { useEffect, useState } from "react";

import { Formik } from "formik";
import Step from "../Step";
import TransientTaxTabs from "../TransientTaxTabs";

const MultiPageForm = props => {
  const {
    history,
    stepList,
    match: { params }
  } = props;
  const { steps = [], panelGroups = [] } = stepList;
  const [myStep, setMyStep] = useState({});
  const [stepInfo, setStepInfo] = useState({});
  const [activeStep, setActiveStep] = useState(1);

  const handleNavClick = stepNumber => {
    history.push(`/steps/${stepNumber}`);
    setActiveStep(stepNumber);
  };

  useEffect(() => {
    const step = stepList.steps.find(
      x => x.stepNumber === parseInt(params.stepNumber)
    );
    setMyStep(step);
  }, [params, stepList]);

  useEffect(() => {
    const { id, stepNumber } = myStep;
    const stepsCount = stepList.steps.length;
    const nextStep = stepNumber < stepsCount ? stepNumber + 1 : null;
    const prevStep = stepNumber === 1 ? null : stepNumber - 1;
    const isLastStep = stepNumber === stepsCount;
    setStepInfo({
      id,
      stepNumber,
      nextStep,
      prevStep,
      isLastStep
    });
  }, [myStep, stepList]);

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
            {Object.keys(myStep).length > 0 && (
              <React.Fragment>
                <p>Step should render:</p>
                <Step
                  key={myStep.id}
                  {...myStep}
                  stepList={stepList}
                  isLastStep={stepInfo.isLastStep}
                  onNextClick={handleNavClick}
                  onPrevClick={handleNavClick}
                  nextStep={stepInfo.nextStep}
                  prevStep={stepInfo.prevStep}
                  tabs={steps}
                  activeStep={activeStep}
                  history={history}
                  //   style={{ display: stepInfo.isActiveStep ? "block" : "none" }}
                />
              </React.Fragment>
            )}
          </div>
        )}
      </Formik>
    </div>
  );
};

export default MultiPageForm;
