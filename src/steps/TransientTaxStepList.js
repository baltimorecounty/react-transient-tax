import { format } from "date-fns";
import React from "react";
import BasicInformationForm from "../components/forms/BasicInformationForm";
import ExemptionCertificateForm from "../components/forms/ExemptionCertificateForm";
import IdentificationForm from "../components/forms/IdentificationForm";
import MonthlyPaymentForm from "../components/forms/MonthlyPaymentForm";
import PaymentOptionsForm from "../components/forms/PaymentOptionsForm";
import ReviewFormPanel from "../components/forms/ReviewFormPanel";
import Step from "./Step";
import StepList from "./StepList";
import { HasAtLeast1Exemption } from "../common/ExemptionUtilities";

/**
 * Dynamically add exemption certificate if an exemption exists
 * @param {StepList} stepList
 * @param {object} currentFormValues
 * @param {object} globalFormValues
 * @param {string} previousStepId reference point for inserted exemption certificate
 */
const onPaymentFormSubmission = ({
  stepList,
  currentFormValues,
  previousStepId,
  monthIndex
}) => {
  const { monthlyData = [] } = currentFormValues;
  const isLastPaymentPanel = monthlyData.length === monthIndex + 1;

  if (!isLastPaymentPanel) {
    return;
  }

  const hasAtLeast1Exemption = HasAtLeast1Exemption(monthlyData);
  const exemptionStepId = "exemption-certificate";

  if (hasAtLeast1Exemption) {
    const exemptionStep = new Step({
      id: exemptionStepId,
      label: `Exemption Certificate`,
      component: <ExemptionCertificateForm />
    });

    const doesExemptionPanelExist = stepList.steps.find(
      step => step.id === exemptionStep.id
    );

    if (!doesExemptionPanelExist) {
      stepList.addStep(exemptionStep, previousStepId);
    }
  } else {
    stepList.removeStep(exemptionStepId);
  }
};

/**
 * Dynamically add payment panels based on date selection
 * @param {StepList} stepList
 * @param {object} currentFormValues formik values for the current step form
 */
const onPaymentSelectionSubmission = (stepList, { monthsToReport }) => {
  stepList.reset();
  let stepToInsertAfter = "payment-selection";
  Object.keys(monthsToReport).forEach((monthKey, monthIndex) => {
    const date = monthsToReport[monthKey];
    const friendlyDate = format(date, "MMMM yyyy");
    const id = `payment-form-${friendlyDate.replace(/\s/g, "")}`;
    const step = new Step({
      id,
      label: `${friendlyDate} Tax Return`,
      component: <MonthlyPaymentForm />,
      onFormSubmission: (stepList, currentFormValues, globalFormValues) => {
        onPaymentFormSubmission({
          stepList,
          currentFormValues,
          globalFormValues,
          monthIndex,
          previousStepId: id
        });
      },
      data: {
        date
      }
    });

    stepList.addStep(step, stepToInsertAfter);
    stepToInsertAfter = id;
  });
};

const steps = [
  new Step({
    id: "basic-information",
    label: "Step 1 - Business Demographics",
    component: <BasicInformationForm />
  }),
  new Step({
    id: "payment-selection",
    label: "Step 2 - Payment Interval Selection",
    component: <PaymentOptionsForm />,
    onFormSubmission: onPaymentSelectionSubmission
  }),
  new Step({
    id: "identification",
    label: "Step 7 - Identification",
    component: <IdentificationForm />
  }),
  new Step({
    id: "review",
    label: "Step 8 - Review",
    component: <ReviewFormPanel />,
    isForm: false
  })
];

export default new StepList(steps);
