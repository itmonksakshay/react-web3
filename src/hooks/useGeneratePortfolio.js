import axios from "axios";
import { useCallback, useRef, useState } from "react";
import * as Sentry from "@sentry/react";

export function useGeneratePortfolio({
  walletAddress,
  riskScore,
  isDemo = false,
  mode = "less",
  diversification,
  selected_chains = [
    {
      value: "all",
      label: "All chains",
    },
  ],
  selected_protocols = [
    {
      value: "all",
      label: "All protocols",
    },
  ],
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [portfolio, setPortfolio] = useState(null);

  // const { token, retry } = useTurnstile();

  const sourceRef = useRef(axios.CancelToken.source());

  const generatePortfolio = useCallback(
    (onSettled = () => {}) => {
      setIsLoading(true);
      setError("");

      axios
        .post(
          `${process.env.REACT_APP_API_ENDPOINT}/analysis/portfolio/${
            walletAddress ? walletAddress : "undefined"
          }`,
          {
            mode,
            diversification,
            isDemo: isDemo ? "true" : undefined,
            risk_score: riskScore,
            selected_chains: selected_chains.map((chain) => chain.value),
            selected_protocols: selected_protocols.map(
              (protocol) => protocol.value
            ),
            // token,
          },
          {
            cancelToken: sourceRef.current.token,
          }
        )
        .then((response) => {
          // if (response.data?.invalid_token) {
          //   retry();
          //   return;
          // }
          if (response.data?.not_enough) {
            setError(
              "There are not enough pools for this setting, try a different setting"
            );
          } else {
            setPortfolio(response.data);
            onSettled();
          }
          setIsLoading(false);
        })
        .catch((error) => {
          if (axios.isCancel(error)) return;
          setIsLoading(false);
          setError("Error");
          onSettled();
          Sentry.captureException(error);
        });
    },
    [
      walletAddress,
      mode,
      diversification,
      riskScore,
      selected_chains,
      selected_protocols,
      isDemo,
    ]
  );

  const resetPortfolio = useCallback(() => {
    setIsLoading(false);
    setPortfolio(null);
    setError("");
  }, []);

  const cancel = useCallback(() => {
    sourceRef.current.cancel();
  }, []);

  return {
    isLoading,
    portfolio,
    error,
    generatePortfolio,
    resetPortfolio,
    cancel,
  };
}
