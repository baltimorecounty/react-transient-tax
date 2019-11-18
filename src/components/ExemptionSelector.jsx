import React, { useEffect, useState } from "react";
import { Field } from "formik";
import { RadioButton } from "../common/RadioButton";
import { ExemptionTypes } from "../common/Constants";
import DateRangeSelector from "./DateRangeSelector";
import { GetExemptionFormErrors } from "../common/ExemptionUtilities";

const ExemptionSelector = props => {
  const {
    exemption: exemptionFromProps = {},
    onExemptionSave = () => {}
  } = props;
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [exemption, setExemption] = useState(exemptionFromProps);

  useEffect(() => {
    setExemption(exemptionFromProps);
  }, [exemptionFromProps]);

  useEffect(() => {
    if (isFormDirty) {
      setFormErrors(GetExemptionFormErrors(exemption));
    }
  }, [isFormDirty, exemption]);

  const saveExemption = () => {
    const errors = GetExemptionFormErrors(exemption);

    if (errors.length === 0) {
      onExemptionSave(exemption);
      resetSelector();
    } else {
      setFormErrors(errors);
    }
  };

  const handleExemptionTypeChange = ({ type, label }) => {
    setIsFormDirty(true);
    setExemption({
      ...exemption,
      ...{ type, label }
    });
  };

  const handleExemptionDateChange = ({ fromDate, toDate }) => {
    setIsFormDirty(true);
    setExemption({
      ...exemption,
      ...{ fromDate, toDate }
    });
  };

  const resetSelector = () => {
    setIsFormDirty(false);
    setExemption({});
  };

  return (
    <div className="tt_exemption-selector">
      {formErrors.length > 0 && (
        <ul className="tt_error-list">
          {formErrors.map(({ key, error }) => (
            <li key={key}>{error}</li>
          ))}
        </ul>
      )}
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
        fromDate={exemption.fromDate}
        toDate={exemption.toDate}
        handleChange={handleExemptionDateChange}
      />
      <button onClick={saveExemption} type="button">
        {exemption.id ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default ExemptionSelector;
