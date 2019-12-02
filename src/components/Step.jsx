import React from "react";
import { connect } from "formik";

const Step = props => {
  const {
    isForm = true,
    label,
    component,
    onNextClick,
    onPrevClick,
    stepNumber,
    nextStep,
    prevStep,
    isLastStep,
    formik,
    tabs,
    isActiveStep,
    ...rest
  } = props;

  const handleNextClick = () => {
    console.log(nextStep);
    onNextClick(nextStep);
  };

  const handlePrevClick = () => {
    onPrevClick(prevStep);
  };

  const onValidSubmission = values => {
    formik.setValues({ ...formik.values, ...values });
    onNextClick(nextStep);
  };

  const nextButton =
    nextStep && !isLastStep && isForm ? (
      <button type="submit" className="next">
        Next - {nextStep}
      </button>
    ) : (
      <button type="text" onClick={handleNextClick}>
        Next - {nextStep}
      </button>
    );
  const prevButton = prevStep && (
    <button onClick={handlePrevClick} type="button" className="previous">
      Previous - {prevStep}
    </button>
  );

  const submitButton = isLastStep && <button type="submit">Submit</button>;

  const componentWithProps = {
    ...component,
    ...{
      props: {
        nextButton,
        prevButton,
        submitButton,
        onValidSubmission,
        tabs,
        isActiveStep,
        label
      }
    }
  };

  return <div {...rest}>{componentWithProps}</div>;
};

export default connect(Step);
