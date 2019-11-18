import React, { useEffect, useState } from "react";
import { Field } from "formik";
import { RadioButton } from "../common/RadioButton";
import { ExemptionTypes } from "../common/Constants";
import DateRangeSelector from "./DateRangeSelector";

const ExemptionSelector = props => {
  const {
    exemption: exemptionFromProps = {},
    onExemptionSave = () => {}
  } = props;
  const [formErrors, setFormErrors] = useState([]);
  const [exemption, setExemption] = useState(exemptionFromProps);

  useEffect(() => {
    setExemption(exemptionFromProps);
  }, [exemptionFromProps]);

  const getFormErrors = () => {
    const activeFormErrors = [];
    const { fromDate, toDate } = exemption;

    if (!fromDate) {
      activeFormErrors.push({ key: "fromDate", error: "From Date Required" });
    }

    if (!toDate) {
      activeFormErrors.push({ key: "toDate", error: "To Date Required" });
    }

    return activeFormErrors;
  };

  const saveExemption = () => {
    const errors = getFormErrors();

    if (errors.length === 0) {
      onExemptionSave(exemption);
      resetSelector();
    } else {
      setFormErrors(errors);
    }
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
      {formErrors.length > 0 && (
        <ul>
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
