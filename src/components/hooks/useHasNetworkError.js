import { useEffect, useState } from "react";

import { GetStatus } from "../../services/ApiService";

const useHasNetworkError = () => {
  const [hasNetworkError, setHasNetworkError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetStatus()
      .catch(() => {
        setHasNetworkError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { hasNetworkError, isLoading };
};

export default useHasNetworkError;
