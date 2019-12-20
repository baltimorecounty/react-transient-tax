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
    activeStep,
    onFormSubmission = () => {},
    stepList,
    data,
    history,
    panelGroupId,
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

  const nextButtonStyle = stepNumber === 1 ? { marginLeft: "auto" } : {};

  const nextButton =
    nextStep && !isLastStep && isForm && !isHidden ? (
      <button type="submit" className="next seButton" style={nextButtonStyle}>
        Next
      </button>
    ) : (
      <button
        type="text"
        onClick={handleNextClick}
        style={nextButtonStyle}
        className="seButton"
      >
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
        activeStep,
        data,
        history
      }
    }
  };

  return (
    <fieldset {...rest}>
      <legend>{label}</legend>
      <div className="clearfix"></div>
      {componentWithProps}
    </fieldset>
  );
};

export default connect(Step);
