import React from "react";

const TransientTaxTabs = props => {
  const { tabs, isActiveStep, activeStep } = props;
  return (
    <div className="bc-citysourced-reporter">
      <ol className="bc-citysourced-reporter-steps">
        {tabs.map(step => (
          <li
            key={step.id}
            style={{ display: step.isHidden ? "none" : "block" }}
            className={
              step.stepNumber === activeStep && isActiveStep ? "highlight" : ""
            }
          >
            {step.label}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TransientTaxTabs;
