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

export function useSwapStatus({ txnHash }) {
  const [status, setStatus] = useState(SwapStatus.NONE);
  const [substatus, setSubstatus] = useState(SwapSubstatus.NONE);

  const txnHashRef = useRef();

  const resetStatus = useCallback(() => {
    setStatus(SwapStatus.NONE);
    setSubstatus(SwapStatus.NONE);
  }, []);

  useEffect(() => {
    txnHashRef.current = txnHash;

    (async () => {
      if (!txnHash) return;
      let result;
      do {
        try {
          result = await getStatus(txnHash);
          if (txnHashRef.current !== txnHash) break;
          setStatus(result.status);
          setSubstatus(result.substatus);
        } catch (e) {
          if (txnHashRef.current !== txnHash) break;
        }
      } while (
        result.status !== SwapStatus.DONE &&
        result.status !== SwapStatus.FAILED
      );
    })();
  }, [txnHash]);

  return { status, substatus, resetStatus };
}
