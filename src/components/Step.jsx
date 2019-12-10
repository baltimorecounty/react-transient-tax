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
        isHidden,
        nextButton,
        prevButton,
        submitButton,
        onValidSubmission,
        tabs,
        formik,
        isActiveStep,
        label,
        data,
        history
      }
    }
  };

  return <div {...rest}>{componentWithProps}</div>;
};

export default connect(Step);
