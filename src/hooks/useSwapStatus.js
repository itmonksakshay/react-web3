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
  const [status, setStatus] = useState({status:SwapStatus.NONE,flag:false});
  const [substatus, setSubstatus] = useState(SwapSubstatus.NONE);
  const throttling = useRef(null)

  const resetStatus = useCallback(() => {
    if(throttling.current)clearTimeout(throttling.current);
    throttling.current = null;
    setStatus((value)=>({status:SwapStatus.NONE,flag:value.flag}));
    setSubstatus(SwapStatus.NONE);
  }, []);

  const getransactionStatus = async (txnHash) => {

    if (txnHash.length) {

      if (throttling.current) {
        clearTimeout(throttling.current);
        setStatus((value)=>({status:value.status,flag:!value.flag}))
        throttling.current = null
        return;
      }

      if(SwapStatus.DONE === status.status){
        return;
      }

      try {
        throttling.current = setTimeout(async () => {

              const result = await getStatus(txnHash);
              setStatus((value)=>({status:result.status,flag:!value.flag}));
              setSubstatus(result.substatusMessage || '');
            }, 20000);
            console.log(throttling.current);
        } catch (e) {
        resetStatus();
      }
    }
  }

  return { status, substatus, resetStatus, getransactionStatus };
}
