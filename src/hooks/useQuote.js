import axios from "axios";
import { ethers } from "ethers";
import { useCallback, useState } from "react";

const fromAmountForGas = 10000000;

export function useQuote() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = useCallback(
    ({
      fromAmount,
      fromChain,
      fromToken,
      fromAddress,
      toChain,
      toToken,
      toAddress,
    }) => {
      if (
        !fromAddress ||
        !fromAmount ||
        !fromChain ||
        !fromToken ||
        !toAddress ||
        !toChain ||
        !toToken
      )
        return;

      fromAmount = ethers.utils.parseUnits(fromAmount, fromToken.decimals);

      setLoading(true);
      setError("");
      axios
        .get("https://staging.li.quest/v1/quote", {
          params: {
            fromChain: fromChain,
            fromToken: fromToken.isNative
              ? fromToken.tokenSymbol
              : fromToken.tokenAddress,
            fromAmount: fromAmount,
            fromAddress: fromAddress,
            toChain: toChain,
            toToken: toToken.isNative
              ? toToken.tokenSymbol
              : toToken.tokenAddress,
            toAddress: toAddress,
            fromAmountForGas: fromAmountForGas,
          },
        })
        .then((response) => {
          setData(response.data);
          setError("");
        })
        .catch((e) => {
          setData(null);
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    []
  );

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError("");
  }, []);

  return { data, loading, error, reset, run };
}
