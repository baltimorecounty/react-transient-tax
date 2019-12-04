import React from "react";
import ReactDOM from "react-dom";
import Form1 from "./components/forms/Form1";
import Form2 from "./components/forms/Form2";
import Form3 from "./components/forms/Form3";
import Form4 from "./components/forms/Form4";
import Form5 from "./components/forms/Form5";
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
    component: <Form1 />
  },
  {
    stepNumber: 2,
    label: "Step 2 - Payment Selection",
    component: <Form2 />
  },
  {
    stepNumber: 3,
    label: "Step 3 - Month",
    component: <Form3 />
    //isHidden: true,
  },
  {
    stepNumber: 4,
    label: "Step 4 - Month",
    component: <Form3 />
    //isHidden: true,
  },
  {
    stepNumber: 5,
    label: "Step 5 - Month",
    component: <Form3 />
    //isHidden: true,
  },
  {
    stepNumber: 6,
    label: "Step 6 - Exemption Certificates ",
    component: <Form4 />
  },
  {
    stepNumber: 7,
    label: "Step 7 - Identification",
    component: <Form5 />
  },
  {
    stepNumber: 8,
    label: "Step 8 - Review",
    component: <Form5 />
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
