import { Config } from "@baltimorecounty/javascript-utilities";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from "react-dom";
import "./App.scss";
import { format } from "date-fns";
import BasicInformationForm1 from "./components/forms/BasicInformation-Form1";
import ExemptionCertificateForm4 from "./components/forms/ExemptionCertificate-Form4";
import IdentificationForm5 from "./components/forms/Identification-Form5";
import MonthlyPaymentForm3 from "./components/forms/MonthlyPayment-Form3";
import MultiPageForm from "./components/forms/MultiPageForm";
import PaymentOptionsForm2 from "./components/forms/PaymentOptions-Form2";
import ReviewForm6 from "./components/forms/Review-Form6";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import Step from "./steps/Step";
import StepList from "./steps/StepList";

const { setConfig } = Config;

const configValues = {
  local: {
    apiRoot: "//localhost:54727/api/transientTax"
  },
  development: {
    apiRoot: "http://testservices.baltimorecountymd.gov/api/transientTax"
  },
  staging: {
    apiRoot: "http://testservices.baltimorecountymd.gov/api/transientTax"
  },
  production: {
    apiRoot: "http://services.baltimorecountymd.gov/api/transientTax"
  }
};

setConfig(configValues);

const onPaymentSelectionSubmission = (stepList, { monthsToReport }) => {
  stepList.reset();
  let stepToInsertAfter = "payment-selection";
  Object.keys(monthsToReport).forEach(monthKey => {
    const date = monthsToReport[monthKey];
    const friendlyDate = format(date, "MMMM yyyy");
    const id = `payment-form-${friendlyDate.replace(/\s/g, "")}`;
    const step = new Step({
      id,
      label: `${friendlyDate} Tax Return`,
      component: <MonthlyPaymentForm3 />
    });

    stepList.addStep(step, stepToInsertAfter);
    stepToInsertAfter = id;
  });
};

const steps = [
  new Step({
    id: "basic-information",
    label: "Step 1 - Business Demographics",
    component: <BasicInformationForm1 />
  }),
  new Step({
    id: "payment-selection",
    label: "Step 2 - Payment Interval Selection",
    component: <PaymentOptionsForm2 />,
    onFormSubmission: onPaymentSelectionSubmission
  }),
  new Step({
    id: "exemption-cert",
    label: "Step 6 - Exemption Certificates ",
    component: <ExemptionCertificateForm4 />,
    isHidden: true
  }),
  new Step({
    id: "identification",
    label: "Step 7 - Identification",
    component: <IdentificationForm5 />
  }),
  new Step({
    id: "review",
    label: "Step 8 - Review",
    component: <ReviewForm6 />,
    isForm: false
  })
];

const stepList = new StepList(steps);

function App() {
  return (
    <div className="App">
      <MultiPageForm stepList={stepList} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
serviceWorker.unregister();
