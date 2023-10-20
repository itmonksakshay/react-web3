import { ReactComponent as ExploreSvg } from "src/assets/img/icons/explore.svg";
import { ProgressBar2 } from "src/components/ProgressBar2";
import { Button } from "src/components/lib";
import { darkenColor, isDarkMode } from "src/utils/helpers";
import { APY } from "../pages/Home/sections/Result2/components/APY";
import { AssetBundle } from "../pages/Home/sections/Result2/components/AssetBundle";
import { ChainLogo } from "../pages/Home/sections/Result2/components/ChainLogo";
import { RiskLevel } from "../pages/Home/sections/Result2/components/RiskLevel";
import { TooltipContainer } from "src/components/Tooltip";

export function PoolBox({
  chain,
  protocol,
  share,
  risk,
  apy,
  pool,
  url,
  color,
  protocolImageId,
  assetImageIds,
  className,
}) {
  return (
    <div
      className={`border-[1px] border-grey-lightest dark:border-grey-darker3 rounded-[8px] bg-grey-lighter4 dark:bg-grey-black overflow-hidden transition-all duration-300 ${className}`}
    >
      <div className="h-[35px] flex items-center px-[14px] gap-[8px] dark:text-grey-lighter8">
        <ChainLogo chain={chain} /> {chain}
      </div>
      <div
        className="rounded-t-[8px] bg-white dark:bg-grey-dark px-[14px] pt-[8px] pb-[30px] transition-all duration-300"
        style={{
          boxShadow: "0px 0px 22px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div className="flex items-center">
          <div
            className="w-[32px] h-[32px] rounded-full dark:border-black dark:border-2 flex items-center justify-center"
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
          <p className="ml-[12px] text-grey-darkest dark:text-white font-bold text-[14px]">
            {protocol}
          </p>
          <div className="ml-auto">
            <p
              className="text-yellow-dark font-caption text-[18px]"
              style={{
                color:
                  color === "#FFFFFF"
                    ? "#E9BE5C"
                    : darkenColor(color, isDarkMode() ? 60 : -40),
              }}
            >
              {share}%
            </p>
            <p className="mt-[3px] font-normal text-[12px] leading-[1.25] dark:text-grey-deep">
              of portfolio
            </p>
          </div>
        </div>
        <ProgressBar2
          max={100}
          value={share}
          color={color}
          className="mt-[12px]"
        />
        <div className="flex items-center mt-[16px]">
          <AssetBundle imageIds={assetImageIds} />
          <p className="ml-[10px] font-normal text-[12px] leading-[1.25] text-grey-deep pr-[10px]">
            {pool}
          </p>
          <div className="ml-auto">
            <p className="text-[12px] leading-[1.33] text-grey-deep">Risk:</p>
            <TooltipContainer
              tooltipContent="Risk rating of a pool, 1 — Less Risk, 5 — High Risk"
              tooltipClassName="!right-[-25px]"
            >
              <RiskLevel
                value={risk}
                bordered
                className="mt-[4px] cursor-default"
              />
            </TooltipContainer>
          </div>
          <div className="ml-[8px]">
            <p className="text-[12px] leading-[1.33] text-grey-deep">APY:</p>
            <TooltipContainer
              tooltipContent="Annual yield of a pool, calculated based on the last 30-day average"
              tooltipClassName="!right-[-8px]"
            >
              <APY value={apy} className="mt-[4px] cursor-default" />
            </TooltipContainer>
          </div>
        </div>
      </div>
      <div className="py-[12.5px] border-t-[1px] dark:bg-[#252525] dark:hover:bg-[#141414] border-grey-light38 dark:border-grey-darker3 hover:bg-yellow-lighter2 transition-all duration-300">
        <Button type={8} link={url} isLink className="mx-auto">
          Explore Pool Page <ExploreSvg />
        </Button>
      </div>
    </div>
  );
}
