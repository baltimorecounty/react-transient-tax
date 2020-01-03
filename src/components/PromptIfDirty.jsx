import { Prompt } from "react-router-dom";
import React from "react";
import { useFormikContext } from "formik";

const PromptIfDirty = props => {
  const formik = useFormikContext();
  const { isExemptionFormDirty } = formik.values;
  return (
    <React.Fragment>
    <Prompt
      when={formik.dirty && formik.submitCount === 0}
      message="Are you sure you want to leave? You have unsaved changes."
    />
    <Prompt
      when={isExemptionFormDirty===false}
      message="You are currently editing an exemption. Are you sure you want to lose those changes?"
    />
    </React.Fragment>
  
  );
};

export default PromptIfDirty;
