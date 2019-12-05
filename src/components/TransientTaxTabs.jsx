import React from "react";

const TransientTaxTabs = props => {
  const { tabs, activeStep } = props;
  return (
    <ol className="progress-bar">
      {tabs.map(step => (
        <li
          key={step.id}
          style={{ display: step.isHidden ? "none" : "block" }}
          className={step.stepNumber === activeStep ? "highlight" : ""}
        >
          {step.label}
        </li>
      ))}
    </ol>
  );
};

export default TransientTaxTabs;
