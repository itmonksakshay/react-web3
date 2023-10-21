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

  const getransactionStatus =(txnHash) => {

    let result = {status:SwapStatus.NONE};
    try {
      setInterval(async () => {

        while (
          result.status !== SwapStatus.DONE &&
          result.status !== SwapStatus.FAILED
        ) {

          result = await getStatus(txnHash);
          setStatus(result.status);
          setSubstatus(result.substatus);

        }

      }, 2000);
    } catch (e) {
      resetStatus();
    }

  }

return { status, substatus, resetStatus, getransactionStatus };
}
