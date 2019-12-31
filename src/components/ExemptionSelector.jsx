import React, { useEffect, useState } from "react";

import DateRangeSelector from "./DateRangeSelector";
import { Field } from "formik";
import { FormHints } from "../common/Constants";
import { GetExemptionFormErrors } from "../common/ExemptionUtilities";
import { GetExemptionTypes } from "../services/ApiService";
import { RadioButton } from "../common/RadioButton";

const ExemptionSelector = props => {
  const {
    exemption: exemptionFromProps = {},
    onExemptionSave = () => {}
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [exemptionTypes, setExemptionTypes] = useState([]);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [exemption, setExemption] = useState(exemptionFromProps);

  useEffect(() => {
    if (exemptionTypes.length === 0) {
      GetExemptionTypes()
        .then(exemptionTypes => {
          setExemptionTypes(exemptionTypes);
          setIsLoading(false);
        })
        .catch(error => props.history.push("/error", { ...error }));
    }
  }, [exemptionTypes, props]);

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

  return isLoading ? (
    <p>Loading Exemption Form...</p>
  ) : (
    <div className="tt_exemption-selector">
      {formErrors.length > 0 && (
        <ul className="tt_error-list">
          {formErrors.map(({ key, error }) => (
            <li key={key}>{error}</li>
          ))}
        </ul>
      )}
      {exemptionTypes.map((exemptionType, index) => {
        const { Id: type, Description: label } = exemptionType;
        const hint =
          label.toLowerCase() === "non-transient" ? FormHints.NonTransient : "";
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
            autoFocus={index === 0}
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
