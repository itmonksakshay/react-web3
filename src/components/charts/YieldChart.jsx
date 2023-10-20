import { useMemo } from "react";
import { DeFiChart } from "./DeFiChart";

export function YieldChart({ apy, base, boost, liquidityShares }) {
  const chartData = useMemo(() => {
    return {
      labels: ["score", ""],
      images: liquidityShares.map(({ imageId }) => {
        const image = new Image();
        image.src = `/images/assets/Logo-${imageId}.png`;
        return image;
      }),
      datasets: [
        {
          label: "Risk Score",
          data: liquidityShares.map(({ share }) => share),
          backgroundColor: liquidityShares.map(({ color }) => color),
          borderColor: liquidityShares.map(() => "#32CC864D"),
        },
      ],
    };
  }, [liquidityShares]);

  return (
    <div
      className="relative w-[213.79px] h-[213.79px] bg-white dark:bg-grey-white5 rounded-full transition-all duration-300"
      style={{
        boxShadow: "1.83144px 21.0615px 32.9658px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(6.41002px)",
      }}
    >
      <div className="w-full h-full bg-white dark:bg-grey-white5 rounded-full">
        <DeFiChart
          data={chartData}
          cutout="83%"
          radius="97%"
          borderRadius={5}
          imageSize={16}
          mobileImageSize={16}
          borderColor="#32CC86"
          borderWidth={1}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col">
        <p className="font-caption text-[18px] leading-[1.1] tracking-[-6.5%] text-grey-lightest text-center">
          APY
        </p>
        <p className="font-caption text-[45px] leading-[1.1] tracking-[-3.5px] text-green-lighter1 drop-shadow-green text-center mt-[-2.5px]">
          <span className="text-[25px]">+</span>
          {apy?.toFixed(2)}
          <span className="text-[25px] ml-[2px]">%</span>
        </p>
        {base && (
          <p className="font-normal text-[12px] leading-[1.25] text-grey-deep text-center mt-[8px]">
            Base: {base.toFixed(2)}%
          </p>
        )}
        {boost && (
          <p className="font-normal text-[12px] leading-[1.25] text-grey-deep text-center mt-[2px]">
            Boost: {boost.toFixed(2)}%
          </p>
        )}
      </div>
    </div>
  );
}
