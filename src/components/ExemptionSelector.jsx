import React, { useEffect, useState } from "react";
import { Field } from "formik";
import { RadioButton } from "../common/RadioButton";
import { ExemptionTypes } from "../common/Constants";
import DateRangeSelector from "./DateRangeSelector";

const ExemptionSelector = props => {
  const {
    exemption: exemptionFromProps = {},
    isExistingRecord,
    onExemptionAdd = () => {}
  } = props;
  const [exemption, setExemption] = useState(exemptionFromProps);
  const { fromDate, toDate } = exemption;
  const [selectedExemptionType, setSelectedExemptionType] = useState(0);

  useEffect(() => {
    setExemption(exemptionFromProps);
    setSelectedExemptionType(parseInt(exemptionFromProps.exemptionType));
  }, [exemptionFromProps]);

  const addExemption = () => {
    onExemptionAdd(exemption);
    resetSelector();
  };

  const handleExemptionTypeChange = changeEvent => {
    const { id, name, value } = changeEvent.target;
    const label = document.querySelectorAll(`label[for=${id}]`);
    const labelText = label[0] ? label[0].textContent : "";

    setSelectedExemptionType(parseInt(value));

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

  const resetSelector = () => {
    setExemption({});
    setSelectedExemptionType(0);
  };

  return (
    <div className="tt_exemption-selector">
      {ExemptionTypes.map(exemptionType => {
        const { id, hint, label } = exemptionType;
        const formLabel = hint ? `${label} ( ${hint} )` : label;
        const isChecked = selectedExemptionType === id;

        return (
          <Field
            key={id}
            component={RadioButton}
            name="exemptionType"
            id={`exemptionType-${id}`}
            label={formLabel}
            value={id}
            onChange={handleExemptionTypeChange}
            checked={isChecked}
          />
        );
      })}
      <DateRangeSelector
        fromDate={fromDate}
        toDate={toDate}
        handleChange={handleExemptionDateChange}
      />
      <button onClick={addExemption} type="button">
        {isExistingRecord ? "Save Changes" : "Add Exemption"}
      </button>
    </div>
  );
};

export default ExemptionSelector;
