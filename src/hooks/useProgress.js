import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useProgress({
  min = 0,
  max = 100,
  defaultValue = -1,
  waitFor,
} = {}) {
  const [progress, setProgress] = useState(defaultValue);
  const initialStep = useMemo(() => (max - min) / 200, [max, min]);
  const stepRef = useRef(initialStep);
  const timeoutIdRef = useRef();

  const isWaitingFor = typeof waitFor !== "undefined";

  const timeoutCallback = useCallback(() => {
    setProgress((p) => {
      if (p >= max) return p;
      timeoutIdRef.current = setTimeout(timeoutCallback, 50);
      if (isWaitingFor) {
        if (!waitFor) {
          const tmpMax = min + (max - min) * 0.95;
          stepRef.current =
            initialStep * Math.pow((tmpMax - p) / (tmpMax - min), 2);
        } else {
          stepRef.current = initialStep * 3;
        }
      }
      return p + stepRef.current;
    });
  }, [initialStep, isWaitingFor, max, min, waitFor]);

  useEffect(() => {
    if (waitFor) {
      clearTimeout(timeoutIdRef.current);
      setTimeout(timeoutCallback, initialStep * 3);
    }
  }, [initialStep, timeoutCallback, waitFor]);

  const start = useCallback(() => {
    setProgress(min);
    timeoutIdRef.current = setTimeout(timeoutCallback, 100);
  }, [min, timeoutCallback]);

  const stop = useCallback(() => {
    clearTimeout(timeoutIdRef.current);
  }, []);

  const reset = useCallback(() => {
    clearTimeout(timeoutIdRef.current);
    setProgress(defaultValue);
  }, [defaultValue]);

  const isCompleted = progress >= max;
  const started = progress >= min;

  return { progress, isCompleted, started, start, stop, reset };
}
