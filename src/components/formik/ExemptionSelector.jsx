import React, { useEffect, useState } from "react";

import BasicErrorMessage from "../BasicErrorMessage";
import DateRangeSelector from "./DateRangeSelector";
import { Field } from "formik";
import { FormHints } from "../../common/Constants";
import { GetExemptionFormErrors } from "../../common/ExemptionUtilities";
import { GetExemptionTypes } from "../../services/ApiService";
import { RadioButton } from "../../common/RadioButton";

const ExemptionSelector = props => {
  const {
    exemption: exemptionFromProps = {},
    onExemptionSave = () => {}
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [exemptionTypes, setExemptionTypes] = useState([]);
  const [touched, setTouched] = useState({});
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [formErrors, setFormErrors] = useState(
    GetExemptionFormErrors(exemptionFromProps)
  );
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
    /** Ensure validation messages are shown */
    setTouched({
      exemptionType: true,
      toDate: true,
      fromDate: true
    });
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

  const handleFieldClick = (clickEvent, name) => {
    setExemption({
      ...exemption
    });
    setTouched({ ...touched, [name || clickEvent.target.name]: true });
  };

  const resetSelector = () => {
    setIsFormDirty(false);
    setExemption({});
    setTouched({});
  };

  return isLoading ? (
    <p>Loading Exemption Form...</p>
  ) : (
    <div className="tt_exemption-selector">
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
            onClick={handleFieldClick}
          />
        );
      })}
      {touched.exemptionType &&
        formErrors.some(({ key }) => key === "exemptionType") && (
          <BasicErrorMessage message="Exemption Type is required." />
        )}
      <DateRangeSelector
        fromDate={exemption.fromDate}
        toDate={exemption.toDate}
        handleChange={handleExemptionDateChange}
        onClick={handleFieldClick}
      />
      {(touched.fromDate || touched.toDate) &&
        formErrors.some(
          ({ key }) => key === "toDate" || key === "fromDate"
        ) && <BasicErrorMessage message="To Date and From Date are Required" />}
      {touched.fromDate &&
        touched.toDate &&
        formErrors.some(({ key }) => key === "badDateRange") && (
          <BasicErrorMessage message="To Date must come after From Date" />
        )}
      <button onClick={saveExemption} type="button">
        {exemption.id ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default ExemptionSelector;
