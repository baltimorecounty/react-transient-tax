import React, { useState, useEffect } from "react";
import ExemptionSelector from "./ExemptionSelector";
import ExemptionsList from "./ExemptionList";
import { AddOrUpdate } from "../common/ArrayUtilities";
import { SaveExemption } from "../services/ApiService";
import { Field } from "formik";
import { Messages } from "../common/Constants";

const ExemptionCertificate = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  formikProps,
  ...props
}) => {

  // console.log('formik in -- ExemptionCertificate:' );
 // formikProps.errors.email = "this is a test";
 // console.log('---formikProps--Start--');
 // console.log('businessName:touched:' + formikProps.touched.businessName);
 // console.log( formikProps );
 // console.log('---formikProps--End----');
  const { setFieldValue } = form;
  const [exemption, setExemption] = useState({});
  const [exemptions, setExemptions] = useState([]);
  const [isSelectorFormDirty, setIsSelectorFormDirty] = useState(0);

  useEffect(() => {
    setFieldValue("exemptions", exemptions);
  }, [exemptions, setFieldValue]);

  useEffect(() => {
    setIsSelectorFormDirty(0);
  }, [setIsSelectorFormDirty]);

  const saveExemption = exemption => {
    const savedExemption = SaveExemption(exemption);
    const updatedExemptions = AddOrUpdate(
      exemptions,
      savedExemption,
      item => item.id === savedExemption.id
    );
    setFieldValue("isExemptionFormDirty", true);
    setExemptions(updatedExemptions);
    setIsSelectorFormDirty(0);
   // setFieldValue("fromDate", "");
    //setFieldValue("toDate", "");
    //form.setFieldTouched("fromDate",false);
    //form.setFieldTouched("toDate",false);
  };

  const editExemption = exemptionToEdit => {
    setFieldValue("isExemptionFormDirty", false);
    setExemption({ ...exemptionToEdit });
    setIsSelectorFormDirty(exemptionToEdit.id);
   form.setFieldTouched("fromDate",true);
     form.setFieldTouched("toDate",true);

  };

  const removeExemption = exemptionId => {
    setExemptions(exemptions.filter(exemption => exemption.id !== exemptionId));
    setExemption({});
  };

  const fromDate = form.values.fromDate;
    const toDate = form.values.toDate;
  console.log('++++++++++++');
    console.log(form);
    console.log('fromDate:' + form.values.fromDate);
    console.log('toDate:' + form.values.toDate);
    console.log('++++++++++++');
    
  return (
  
    <div className="tt_form-section">
      <p>{Messages.ExemptionCertificate.Certification}</p>
      <ExemptionSelector
        exemption={exemption}
        onExemptionSave={saveExemption}
        form= {form}
        formikProps={formikProps}
      />
      {exemptions.length > 0 && (
        <ExemptionsList
          exemptions={exemptions}
          isSelectorFormDirty={isSelectorFormDirty}
          handleEditClick={editExemption}
          handleRemoveClick={removeExemption}
        />
      )}
      <p>{Messages.ExemptionCertificate.Qualification}</p>
    </div>
  );
};

const ExemptionCertificateField = props => (
  <Field component={ExemptionCertificate} {...props} />
  
);

export default ExemptionCertificateField;
