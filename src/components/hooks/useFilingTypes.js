import { useEffect, useState } from "react";

import { GetFilingTypes } from "../../services/ApiService";

const useFilingTypes = () => {
  const [filingTypes, setFilingTypes] = useState([]);

  useEffect(() => {
    GetFilingTypes().then(filingTypes => {
      setFilingTypes(filingTypes);
    });
  }, []);

  return filingTypes;
};

export default useFilingTypes;
