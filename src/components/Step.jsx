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
    history.push(`/steps/${prevStep}`);
    onPrevClick(prevStep);
  };

  /**
   * Call callback (onFormSubmission), set main formik field values, navigate to the next form
   * @param {object} values form values from form panel to be inserted into the paged form's context
   * @param {boolean} shouldSkipFormSubmission manually skip callback, a case for this would be when nothing has changed in the form.
   */
  const onValidSubmission = (values, shouldSkipFormSubmission = true) => {
    if (shouldSkipFormSubmission) {
      onFormSubmission(
        stepList,
        values,
        formik.values,
        shouldSkipFormSubmission
      );
    }
    formik.setValues({ ...formik.values, ...values });
    onNextClick(nextStep);
    history.push(`/steps/${nextStep}`);
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
