import { useMemo } from "react";
import { DeFiChart } from "./DeFiChart";

export function RiskScoreChart({
  score,
  max = 10,
  small = false,
  label = "",
  bgNone = false,
  className = "",
  scoreClassName = "",
  style,
}) {
  const color =
    score / max >= 0.6
      ? "#16D07B60"
      : score / max >= 0.4
      ? "#F0B93A"
      : "#E31818";

  const chartData = useMemo(() => {
    return {
      labels: ["score", ""],
      datasets: [
        {
          label: "Risk Score",
          data: [score, max - score],
          backgroundColor: [color, "#00000000"],
        },
      ],
    };
  }, [score, max, color]);

  return (
    <div
      className={`relative rounded-full transition-all duration-300 ${className}`}
      style={style}
    >
      <div
        className={`w-full h-full ${
          bgNone ? "" : "bg-white dark:bg-grey-white5"
        } rounded-full`}
      >
        <DeFiChart
          data={chartData}
          cutout="83%"
          radius="97%"
          borderRadius={5}
          borderWidth={0}
          gap={0}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col">
        <p
          className={`font-caption ${
            small ? "text-[16px]" : "text-[84px]"
          } leading-[1.1] tracking-[-8.5%] text-center ${scoreClassName}`}
          style={{
            color,
          }}
        >
          {score}
        </p>
        {label && (
          <p className="mt-[7px] font-normal text-[12px] leading-[1.25] text-center text-grey-deep">
            {label}
          </p>
        )}
        {!small && !label && (
          <>
            <p className="font-normal text-[12px] leading-[1.25] text-center text-grey-deep mt-[2px]">
              Rated By
            </p>
            <div className="flex items-center gap-[4px] mx-auto mt-[4px]">
              <img
                src="/images/indexers/Logo-0.png"
                alt="Indexer"
                className="w-[24px] h-[24px] object-cover"
              />
              <img
                src="/images/indexers/Logo-1.png"
                alt="Indexer"
                className="w-[24px] h-[24px] object-cover"
              />
              <img
                src="/images/indexers/Logo-2.png"
                alt="Indexer"
                className="w-[24px] h-[24px] object-cover"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
