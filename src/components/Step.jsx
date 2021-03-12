import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "formik";

const Step = props => {
  const {
    isHidden = false,
    isForm = true,
    label,
    component,
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
    initialValues = {},
    ...rest
  } = props;

  const hasFormData = Object.keys(formik.values).length > 0;
  if (!hasFormData && stepNumber > 1) {
    return <Redirect to="/steps/1" />;
  }

  const getStepId = stepNumber =>
    (
      stepList.steps.find(x => x.stepNumber === stepNumber).id ||
      "basic-information"
    ).toLowerCase();

  const handlePrevClick = () => {
    history.push(`/steps/${getStepId(prevStep)}`);
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
    history.push(`/steps/${getStepId(nextStep)}`);
  };

  const nextButtonStyle = stepNumber === 1 ? { marginLeft: "auto" } : {};
  const nextButton =
    nextStep && !isLastStep && isForm && !isHidden ? (
      <button type="submit" className="next seButton dg_button" style={nextButtonStyle}>
        Next
      </button>
    ) : null;
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
    <button type="submit" className="seButton dg_button">
      Submit
    </button>
  );

  const getInitialValues = values =>
    Object.keys(values).reduce((acc, currentValue) => {
      const newKey = {
        [currentValue]: formik.values[currentValue] || values[currentValue]
      };

      return { ...acc, ...newKey };
    }, {});

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
        history,
        initialValues: getInitialValues(initialValues)
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
