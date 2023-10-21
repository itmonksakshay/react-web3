import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { SwapStatus, SwapSubstatus } from "src/constants/enums";

const getStatus = async (txHash) => {
  const result = await axios.get("https://li.quest/v1/status", {
    params: {
      txHash,
    },
  });
  return result.data;
};

export function useSwapStatus() {
  const [status, setStatus] = useState(SwapStatus.NONE);
  const [substatus, setSubstatus] = useState(SwapSubstatus.NONE);

  const resetStatus = useCallback(() => {
    setStatus(SwapStatus.NONE);
    setSubstatus(SwapStatus.NONE);
  }, []);

  const getransactionStatus = (txnHash) => {

    let result = { status: SwapStatus.NONE,substatus: SwapStatus.NONE};
    let interval;
    try {

      interval = setInterval(async () => {

        result = await getStatus(txnHash);
        setStatus(result.status);
        setSubstatus(result.substatus || '');

      }, 2000);

      if (result.status == SwapStatus.DONE &&
        result.status == SwapStatus.FAILED) {
        clearInterval(interval)
      }

    } catch (e) {
      resetStatus();
      clearInterval(interval);
    }
  }

  return { status, substatus, resetStatus, getransactionStatus };
}
