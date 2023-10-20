import axios from "axios";
import { useCallback, useState } from "react";
import * as Sentry from "@sentry/react";

export function useLatestPorfolio() {
  const [latestPortfolio, setLatestPortfolio] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");

  const getLatestPortfolio = useCallback(
    ({ walletAddress, onSuccess = () => {} }) => {
      if (!walletAddress) return;
      setLatestPortfolio(null);
      setIsLoading(false);
      setIsLoading(true);
      setError("");
      Promise.all([
        axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/portfolio/latest/${walletAddress}`
        ),
        new Promise((resolve, reject) => {
          setTimeout(resolve, 1000);
        }),
      ])
        .then(([response]) => {
          onSuccess(response.data);
          setLatestPortfolio(response.data);
          setIsLoading(false);
          setIsLoaded(true);
        })
        .catch((error) => {
          setIsLoaded(false);
          setIsLoading(false);
          setError(`${error.response.data.message}`);
          Sentry.captureException(error);
        });
    },
    []
  );

  const resetLatestPortfolio = useCallback(() => {
    setLatestPortfolio(null);
    setIsLoaded(false);
    setIsLoading(false);
    setError("");
  }, []);

  return {
    getLatestPortfolio,
    resetLatestPortfolio,
    latestPortfolio,
    isLoading,
    isLoaded,
    error,
  };
}
