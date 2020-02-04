import React, { useEffect, useState } from "react";

import BasicErrorMessage from "../BasicErrorMessage";
import DateRangeSelector from "./DateRangeSelector";
import { Field } from "formik";
import { FormHints } from "../../common/Constants";
import { GetExemptionFormErrors } from "../../common/ExemptionUtilities";
import { GetExemptionTypes } from "../../services/ApiService";
import { RadioButton } from "../../common/RadioButton";
import { IsDateRangeAtLeast90Days } from "../../common/DatesUtilities";

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
  const nonTransientExemptionType = exemptionTypes.find(
    x => x.Description === "Non-Transient"
  );
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
      fromDate: true,
      inRange: true
    });

    const errors = GetExemptionFormErrors(exemption);

    if (errors.length === 0) {
      onExemptionSave(exemption);
      resetSelector();
    } else {
      setFormErrors(errors);
    }
  };

  const checkNonTransientDateCondition = (type, fromDate, toDate) =>
    type === nonTransientExemptionType.Id && fromDate && toDate
      ? IsDateRangeAtLeast90Days(fromDate, toDate)
      : false;

  const handleExemptionTypeChange = ({ type, label }) => {
    const { fromDate, toDate } = exemption;
    setIsFormDirty(true);
    const isDateRangeAtLeast90days = checkNonTransientDateCondition(
      type,
      fromDate,
      toDate
    );
    setExemption({
      ...exemption,
      ...{ type, label, isDateRangeAtLeast90days }
    });
  };

  const handleExemptionDateChange = ({ fromDate, toDate }) => {
    const type = Object.values(exemption).length > 0 ? exemption.type : null;
    setIsFormDirty(true);
    const isDateRangeAtLeast90days =
      !type || checkNonTransientDateCondition(type, fromDate, toDate);
    setExemption({
      ...exemption,
      ...{ fromDate, toDate, isDateRangeAtLeast90days }
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
          ({ key }) => key === "fromDate" || key === "toDate"
        ) && (
          <BasicErrorMessage message="To and From Date are required to submit an exemption." />
        )}
      {(touched.fromDate || touched.toDate) &&
        formErrors.some(({ key }) => key === "isDateRangeAtLeast90days") && (
          <BasicErrorMessage message="Data range must be at least 90 consecutive days." />
        )}
      <button onClick={saveExemption} type="button">
        {exemption.id ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default ExemptionSelector;
