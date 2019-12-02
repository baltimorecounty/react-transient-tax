import React from "react";

const BuildSteps = (steps, activeStep) => {
  return (
    <ol className="progress-bar">
      {steps.map(step => (
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

export { BuildSteps };
