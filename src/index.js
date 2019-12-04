import React from "react";
import ReactDOM from "react-dom";
import BasicInformationForm1 from "./components/forms/BasicInformation-Form1";
import PaymentOptionsForm2 from "./components/forms/PaymentOptions-Form2";
import MonthlyPaymentForm3 from "./components/forms/MonthlyPayment-Form3";
import ExemptionCertificateForm4 from "./components/forms/ExemptionCertificate-Form4";
import IdentificationForm5 from "./components/forms/Identification-Form5";
import ReviewForm6 from "./components/forms/Review-Form6";
import { Config } from "@baltimorecounty/javascript-utilities";
import "react-datepicker/dist/react-datepicker.css";
import "./App.scss";
import MultiPageForm from "./components/forms/MultiPageForm";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

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

const steps = [
  {
    stepNumber: 1,
    label: "Step 1 - Business Demographics",
    component: <BasicInformationForm1 />
  },
  {
    stepNumber: 2,
    label: "Step 2 - Payment Selection",
    component: <PaymentOptionsForm2 />
  },
  {
    stepNumber: 3,
    label: "Step 3 - Month",
    component: <MonthlyPaymentForm3 />,
    isHidden: true
  },
  {
    stepNumber: 4,
    label: "Step 4 - Month",
    component: <MonthlyPaymentForm3 />,
    isHidden: true
  },
  {
    stepNumber: 5,
    label: "Step 5 - Month",
    component: <MonthlyPaymentForm3 />,
    isHidden: true
  },
  {
    stepNumber: 6,
    label: "Step 6 - Exemption Certificates ",
    component: <ExemptionCertificateForm4 />,
    isHidden: true
  },
  {
    stepNumber: 7,
    label: "Step 7 - Identification",
    component: <IdentificationForm5 />
  },
  {
    stepNumber: 8,
    label: "Step 8 - Review",
    component: <ReviewForm6 />,
    isForm: false
  }
];

function App() {
  return (
    <div className="App">
      <MultiPageForm steps={steps} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
serviceWorker.unregister();
