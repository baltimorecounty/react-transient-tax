import React, { useEffect, useState } from "react";
import { Field } from "formik";
import { RadioButton } from "../common/RadioButton";
import { ExemptionTypes } from "../common/Constants";
import DateRangeSelector from "./DateRangeSelector";

const ExemptionSelector = props => {
  const {
    exemption: exemptionFromProps = {},
    isExistingRecord,
    onExemptionSave = () => {}
  } = props;
  const [exemption, setExemption] = useState(exemptionFromProps);
  const { fromDate, toDate } = exemption;

  useEffect(() => {
    setExemption(exemptionFromProps);
  }, [exemptionFromProps]);

  const saveExemption = () => {
    onExemptionSave(exemption);
    resetSelector();
  };

  const handleExemptionTypeChange = ({ type, label }) => {
    setExemption({
      ...exemption,
      ...{ type, label }
    });
  };

  const handleExemptionDateChange = ({ fromDate, toDate }) => {
    setExemption({
      ...exemption,
      ...{ fromDate, toDate }
    });
  };

  const resetSelector = () => {
    setExemption({});
  };

  return (
    <div className="tt_exemption-selector">
      {ExemptionTypes.map(exemptionType => {
        const { id: type, hint, label } = exemptionType;
        const formLabel = hint ? `${label} ( ${hint} )` : label;

        const handleChange = () => {
          handleExemptionTypeChange({ type, label });
        };

        return (
          <Field
            key={type}
            component={RadioButton}
            name="exemptionType"
            id={`exemptionType-${type}`}
            label={formLabel}
            value={type}
            onChange={handleChange}
            checked={exemption.type === type}
          />
        );
      })}
      <DateRangeSelector
        fromDate={fromDate}
        toDate={toDate}
        handleChange={handleExemptionDateChange}
      />
      <button onClick={saveExemption} type="button">
        {isExistingRecord ? "Save Changes" : "Add Exemption"}
      </button>
    </div>
  );
};

export default ExemptionSelector;
