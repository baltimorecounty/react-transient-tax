import BasicInformationForm from "../components/forms/BasicInformationForm";
import ExemptionCertificateForm from "../components/forms/ExemptionCertificateForm";
import { HasAtLeast1Exemption } from "../common/ExemptionUtilities";
import IdentificationForm from "../components/forms/IdentificationForm";
import MonthlyPaymentForm from "../components/forms/MonthlyPaymentForm";
import PaymentOptionsForm from "../components/forms/PaymentOptionsForm";
import React from "react";
import ReviewFormPanel from "../components/forms/ReviewFormPanel";
import Step from "./Step";
import StepList from "./StepList";
import { format } from "date-fns";

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
      component: <ExemptionCertificateForm />,
      panelGroupId: 2,
      initialValues: {
        exemptions: [],
     
      }
    });

    const doesExemptionPanelExist = stepList.steps.find(
      step => step.id === exemptionStep.id
    );

    if (!doesExemptionPanelExist) {
      stepList.addStep(exemptionStep, previousStepId);
    }
  } else {
    stepList.removeStepById(exemptionStepId);
  }
};

/**
 * Remove existing payment form steps
 * @param {object} stepList
 */
const removeExistingPaymentFormSteps = stepList => {
  const paymentFormRegex = /^payment-form-.*$/gi;
  stepList.removeStep("id", paymentFormRegex);
};

/**
 * Dynamically add payment panels based on date selection
 * @param {StepList} stepList
 * @param {object} currentFormValues formik values for the current step form
 */
const onPaymentSelectionSubmission = (
  stepList,
  { monthsToReport: { months = {} } }
) => {
  removeExistingPaymentFormSteps(stepList);

  let stepToInsertAfter = "payment-selection";
  Object.keys(months).forEach((monthKey, monthIndex) => {
    const date = months[monthKey];
    const friendlyDate = format(date, "MMMM yyyy");
    const id = `payment-form-${friendlyDate.replace(/\s/g, "")}`;
    const step = new Step({
      id,
      label: `${friendlyDate} Tax Return`,
      component: <MonthlyPaymentForm />,
      panelGroupId: 2,
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
      },
      initialValues: {
        grossRentalCollected: 0,
        governmentExemptRentalCollected: 0,
        nonTransientRentalCollected: 0
      }
    });

    stepList.addStep(step, stepToInsertAfter);
    stepToInsertAfter = id;
  });
};

const panelGroups = [
  {
    id: 1,
    label: "Business Information"
  },
  {
    id: 2,
    label: "Tax Return Forms"
  },
  {
    id: 3,
    label: "Additional Information"
  },
  {
    id: 4,
    label: "Review & Submit"
  }
];

const steps = [
  new Step({
    id: "basic-information",
    label: "Business Information",
    component: <BasicInformationForm />,
    panelGroupId: 1,
    initialValues: {
      businessName: "",
      businessAddress: "",
      address: {},
      tradeAlias: "",
      tradeAliasAddress: ""
    }
  }),
  new Step({
    id: "payment-selection",
    label: "Payment Interval Selection",
    component: <PaymentOptionsForm />,
    onFormSubmission: onPaymentSelectionSubmission,
    panelGroupId: 2,
    initialValues: {
      paymentInterval: "",
      monthsToReport: {
        months: {},
        returnStatus: {},
        intervalDate: ""
      }
    }
  }),
  new Step({
    id: "identification",
    label: "Identification",
    component: <IdentificationForm />,
    panelGroupId: 3,
    initialValues: {
      tradeAlias: "",
      email: "",
      nameOfSubmitter: "",
      titleOfSubmitter: "",
      tradeAliasAddress: ""
    }
  }),
  new Step({
    id: "review",
    label: "Review",
    component: <ReviewFormPanel />,
    isForm: false,
    panelGroupId: 4
  })
];

export default new StepList(steps, panelGroups);
