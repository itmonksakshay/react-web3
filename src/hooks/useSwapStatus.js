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

  const getransactionStatus = async(txnHash) => {

    let result = { status: SwapStatus.NONE,substatus: SwapStatus.NONE};
    let timeout;
    try {

      if (!timeout) {
        result = await getStatus(txnHash);
        setStatus(result.status);
        setSubstatus(result.substatus || '');
        timeout = setTimeout(function() {
          if(result.status !== SwapStatus.DONE && result.status !== SwapStatus.FAILED) timeout = undefined;
        }, 2000);
      }

    } catch (e) {
      resetStatus();
      clearInterval(interval);
    }
  }

  return { status, substatus, resetStatus, getransactionStatus };
}
