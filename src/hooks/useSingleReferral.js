import * as Sentry from "@sentry/react";
import axios from "axios";
import { useEffect, useState } from "react";

export function useSingleReferral({ referralCode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [referral, setReferral] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError("");

    axios
      .get(
        `${process.env.REACT_APP_API_ENDPOINT}/referral/detail/${referralCode}`
      )
      .then((response) => {
        setReferral(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError("Error");
        Sentry.captureException(error);
      });
  }, [referralCode]);

  return {
    isLoading,
    referral,
    error,
  };
}
