import { formatInTimeZone } from "date-fns-tz";
import { useEffect, useRef, useState } from "react";

export function StatsCard({
  data: { lastUpdatedAt, boostLevel, totalWaitlist },
  className,
}) {
  const [internalBoostLevel, setInternalBoostLevel] = useState(0);
  const [internalTotalWaitlist, setInternalTotalWaitlist] = useState(0);

  const timerRef1 = useRef();
  const timerRef2 = useRef();

  useEffect(() => {
    timerRef1.current = setInterval(() => {
      setInternalBoostLevel((i) => {
        if (i + 1 >= boostLevel) {
          clearInterval(timerRef1.current);
          return boostLevel;
        }
        return Math.min(i + 1, boostLevel);
      });
    }, 20);
    timerRef2.current = setInterval(() => {
      setInternalTotalWaitlist((i) => {
        if (i + 102 >= totalWaitlist) {
          clearInterval(timerRef2.current);
          return totalWaitlist;
        }
        return Math.min(i + 102, totalWaitlist);
      });
    }, 20);
  }, [boostLevel, totalWaitlist]);

  return (
    <div
      className={`rounded-[8px] bg-white dark:bg-grey-dark p-[16px] lg:pb-[54px] flex flex-col gap-[8px] lg:gap-[32px] shadow-main lg:min-w-[511px] ${className}`}
    >
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-[20px] leading-[1.14] text-grey-dark dark:text-white">
          Stats
        </h4>
        <p className="font-normal text-grey-deep text-[12px] leading-[1.25]">
          Last updated:{" "}
          {`${formatInTimeZone(lastUpdatedAt, "UTC", "dd MMM yyyy")} 00:00:00 UTC`}
        </p>
      </div>
      <div className="flex flex-col gap-[16px] lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-[8px]">
          <p className="font-caption font-medium text-[32px] lg:text-[44px] leading-[1.1] text-yellow-dark">
            {internalBoostLevel >= 0 ? "+" : ""}
            {internalBoostLevel}%
          </p>
          <p className="font-caption font-medium text-[20px] leading-[1.14] text-grey-black dark:text-white">
            Your boost level
          </p>
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-caption font-medium text-[32px] lg:text-[44px] leading-[1.1] text-yellow-dark">
            {Number(internalTotalWaitlist).toLocaleString()}
          </p>
          <p className="font-caption font-medium text-[20px] leading-[1.14] text-grey-black dark:text-white">
            Total on the waitlist
          </p>
        </div>
      </div>
    </div>
  );
}
