import { Prompt } from "react-router-dom";
import React from "react";
import { useFormikContext } from "formik";

const PromptIfUpdating = props => {
  const formik = useFormikContext();
  const { isExemptionFormDirty } = formik.values;
  return (
    <Prompt
      when={isExemptionFormDirty===false}
      message="You are currently editing an exemption. Are you sure you want to lose those changes?"
    />
  );
};

export default PromptIfUpdating;
