import React from "react";
import { connect } from "formik";

const Step = props => {
  const {
    isHidden = false,
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
    activeStep,
    onFormSubmission = () => {},
    stepList,
    data,
    history,
    ...rest
  } = props;

  const handleNextClick = () => {
    onNextClick(nextStep);
  };

  const handlePrevClick = () => {
    onPrevClick(prevStep);
  };

  const onValidSubmission = values => {
    onFormSubmission(stepList, values, formik.values);
    formik.setValues({ ...formik.values, ...values });
    onNextClick(nextStep);
  };

  const nextButton =
    nextStep && !isLastStep && isForm && !isHidden ? (
      <button type="submit" className="next seButton">
        Next
      </button>
    ) : (
      <button type="text" onClick={handleNextClick} className="seButton">
        Next
      </button>
    );
  const prevButton = prevStep && (
    <button
      onClick={handlePrevClick}
      type="button"
      className="previous seButton"
    >
      Previous
    </button>
  );

  const submitButton = isLastStep && (
    <button type="submit" className="seButton">
      Submit
    </button>
  );

  const componentWithProps = {
    ...component,
    ...{
      props: {
        isHidden,
        nextButton,
        prevButton,
        submitButton,
        onValidSubmission,
        tabs,
        formik,
        isActiveStep,
        activeStep,
        label,
        data,
        history
      }
    }
  };

  return <fieldset {...rest}>{componentWithProps}</fieldset>;
};

export default connect(Step);
