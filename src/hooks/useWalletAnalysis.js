import axios from "axios";
import { useCallback, useRef, useState } from "react";
import * as Sentry from "@sentry/react";

export function useWalletAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [walletAnalysis, setWalletAnalysis] = useState("");

  const sourceRef = useRef(axios.CancelToken.source());

  const getWalletAnalysis = useCallback((walletAddress) => {
    setIsLoading(true);
    setError("");

    axios
      .get(
        `${process.env.REACT_APP_API_ENDPOINT}/analysis/wallet/${walletAddress}`,
        {
          cancelToken: sourceRef.current.token,
        }
      )
      .then((response) => {
        if (response.data?.not_enough) {
          setError(
            "There are not enough pools for this setting, try a different setting"
          );
        } else {
          setWalletAnalysis(response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setIsLoading(false);
        setError("Error");
        Sentry.captureException(error);
      });
  }, []);

  const resetWalletAnalysis = useCallback(() => {
    setIsLoading(false);
    setWalletAnalysis(null);
    setError("");
  }, []);

  const cancel = useCallback(() => {
    sourceRef.current.cancel();
  }, []);

  return {
    isLoading,
    walletAnalysis,
    error,
    getWalletAnalysis,
    resetWalletAnalysis,
    cancel,
  };
}
