import React, { useState } from "react";
import { Field } from "formik";
import { RadioButton } from "../common/RadioButton";
import { ExemptionTypes } from "../common/Constants";
import DateToFromSelector from "./DateToFromSelector";
import ExemptionsList from "./ExemptionList";

const ExemptionSelector = props => {
  const [exemption, setExemption] = useState({});
  const [exemptions, setExemptions] = useState([]);

  const addExemption = () => {
    setExemptions([...exemptions, exemption]);
  };

  const handleExemptionTypeChange = changeEvent => {
    const { id, name, value } = changeEvent.target;
    const label = document.querySelectorAll(`label[for=${id}]`);
    const labelText = label[0] ? label[0].textContent : "";

    console.log(id, label[0]);

    setExemption({
      ...exemption,
      ...{ [name]: value, label: labelText }
    });
  };

  const handleExemptionDateChange = dates => {
    const { fromDate, toDate } = dates;

    setExemption({
      ...exemption,
      ...{ fromDate, toDate }
    });
  };

  return (
    <div className="tt_exemption-selector">
      {exemptions.length > 0 && <ExemptionsList exemptions={exemptions} />}
      {ExemptionTypes.map(exemptionType => {
        const { id, hint, label } = exemptionType;
        const formLabel = hint ? `${label} ( ${hint} )` : label;
        return (
          <Field
            key={id}
            component={RadioButton}
            name="exemptionType"
            id={`exemptionType-${id}`}
            label={formLabel}
            value={id}
            onChange={handleExemptionTypeChange}
          />
        );
      })}
      <DateToFromSelector handleChange={handleExemptionDateChange} />
      <button onClick={addExemption} type="button">
        Add Exemption
      </button>
    </div>
  );
};

export default ExemptionSelector;
