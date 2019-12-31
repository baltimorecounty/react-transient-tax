import { useEffect, useState } from "react";

import { GetExemptionTypes } from "../../services/ApiService";

const useExemptionTypes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [exemptionTypes, setExemptionTypes] = useState([]);

  useEffect(() => {
    GetExemptionTypes().then(exemptionTypes => {
      setExemptionTypes(exemptionTypes);
      setIsLoading(false);
    });
  }, []);

  return [{ exemptionTypes, isLoading }, setExemptionTypes];
};

export default useExemptionTypes;
