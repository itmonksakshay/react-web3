import axios from "axios";
import { useCallback, useState } from "react";
import * as Sentry from "@sentry/react";

export function useRiskTrendings() {
  const [riskTrendings, setRiskTrendings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getRiskTrendings = useCallback(() => {
    setRiskTrendings(null);
    setIsLoading(true);
    setError("");
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/analysis/risk-trendings`)
      .then((response) => {
        setRiskTrendings(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(`${error?.response?.data?.message}`);
        Sentry.captureException(error);
      });
  }, []);

  return { getRiskTrendings, riskTrendings, isLoading, error };
}
