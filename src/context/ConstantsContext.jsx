import React, { useState, useEffect } from "react";
import { GetExemptionTypes, GetFilingTypes } from "../services/ApiService";

const ConstantsContext = React.createContext([{}, () => {}]);

const ConstantsProvider = props => {
  const [exemptionTypes, setExemptionTypes] = useState([]);
  const [filingTypes, setFilingTypes] = useState([]);

  useEffect(() => {
    if (exemptionTypes.length === 0) {
      GetExemptionTypes().then(setExemptionTypes);
    }
  }, [exemptionTypes, setExemptionTypes]);

  useEffect(() => {
    if (filingTypes.length === 0) {
      GetFilingTypes().then(setFilingTypes);
    }
  }, [filingTypes, setFilingTypes]);

  return (
    <ConstantsContext.Provider value={[{ exemptionTypes, filingTypes }]}>
      {props.children}
    </ConstantsContext.Provider>
  );
};

export { ConstantsContext, ConstantsProvider };
