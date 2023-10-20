import * as Sentry from "@sentry/react";
import axios from "axios";
import { useCallback, useState } from "react";

export function useReferralData() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [referralData, setReferralData] = useState(null);

  const getReferralData = useCallback((walletAddress) => {
    setIsLoading(true);
    setError("");

    axios
      .get(
        `${process.env.REACT_APP_API_ENDPOINT}/referral/get/${walletAddress}`
      )
      .then((response) => {
        setReferralData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError("Error");
        Sentry.captureException(error);
      });
  }, []);

  return {
    isLoading,
    referralData,
    error,
    getReferralData,
  };
}
