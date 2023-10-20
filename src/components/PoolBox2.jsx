import { ReactComponent as ExploreSvg } from "src/assets/img/icons/explore.svg";
import { Button } from "src/components/lib";
import { AssetBundle } from "../pages/Home/sections/Result2/components/AssetBundle";
import { ChainLogo } from "../pages/Home/sections/Result2/components/ChainLogo";
import { RiskScoreChart } from "./charts/RiskScoreChart";

export function PoolBox2({
  pool,
  riskScore,
  apy,
  tvl,
  protocol,
  chain,
  url,
  assetImageIds,
  protocolImageId,
  color,
  className,
}) {
  return (
    <div
      className={`border-[1px] border-grey-lightest dark:border-grey-darker3 rounded-[8px] bg-white dark:bg-grey-black overflow-hidden transition-all duration-300 ${className}`}
    >
      <div className="flex items-center mt-[16px] px-[8px]">
        <AssetBundle imageIds={assetImageIds} />
        <p className="font-caption text-[18px] leading-[1.46] text-grey-black ml-[16px]">
          {pool}
        </p>
        <RiskScoreChart
          score={riskScore}
          small
          className="w-[43px] h-[43px] ml-auto"
          style={{
            boxShadow:
              "0.20543470978736877px 2.362499237060547px 3.6978254318237305px 0px #0000001A",
          }}
        />
      </div>
      <div
        className="grid grid-cols-2 mt-[24px] gap-y-[24px] px-[8px]"
        style={{
          gridTemplateColumns: "1fr max-content",
        }}
      >
        <div>
          <p className="text-[12px] leading-[1.1] text-grey-deep">TVL</p>
          <p className="font-caption text-[16px] leading-[1.46] text-grey-dark">
            ${tvl.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[12px] leading-[1.1] text-grey-deep">APY</p>
          <p className="font-caption text-[16px] leading-[1.46] text-green-lighter1">
            {apy > 0 ? "+" : ""}
            {apy}%
          </p>
        </div>
        <div>
          <p className="text-[12px] leading-[1.1] text-grey-deep">Protocol</p>
          <div className="flex items-center gap-[8px] mt-[4px]">
            <div
              className="w-[16px] h-[16px] rounded-full dark:border-black dark:border-2 flex items-center justify-center"
              style={{
                backgroundColor: color,
              }}
            >
              <img
                src={`/images/protocols/Logo-${protocolImageId}.png`}
                className="w-[80%] h-[80%]"
                alt="Pool"
              />
            </div>
            <p className="text-grey-black text-[16px] leading-[1.1]">
              {protocol}
            </p>
          </div>
        </div>
        <div>
          <p className="text-[12px] leading-[1.1] text-grey-deep">Chain</p>
          <div className="flex items-center gap-[8px] mt-[4px]">
            <ChainLogo chain={chain} />
            <p className="text-grey-black text-[16px] leading-[1.1]">{chain}</p>
          </div>
        </div>
      </div>
      <div className="mt-[8px] py-[12.5px] border-t-[1px] dark:bg-[#252525] dark:hover:bg-[#141414] border-grey-light38 dark:border-grey-darker3 hover:bg-yellow-lighter2 transition-all duration-300">
        <Button type={8} link={url} isLink className="mx-auto">
          Explore Pool Page <ExploreSvg />
        </Button>
      </div>
    </div>
  );
}
