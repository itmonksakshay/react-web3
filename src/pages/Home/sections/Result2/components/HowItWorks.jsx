import { useRef, useState } from "react";
import { ReactComponent as CloseIcon } from "src/assets/img/icons/close.svg";
import { ReactComponent as DatabaseSvg } from "src/assets/img/icons/database.svg";
import { ReactComponent as HistorySvg } from "src/assets/img/icons/history.svg";
import { ReactComponent as SpeedometerSvg } from "src/assets/img/icons/speedometer.svg";
import { ReactComponent as WarningHexagonSvg } from "src/assets/img/icons/warning-hexagon-outlined.svg";
import { ReactComponent as WorkflowSvg } from "src/assets/img/icons/workflow.svg";
import { Tooltip } from "src/components/Tooltip";
import { useMobile } from "src/hooks/useMobile";

export function HowItWorks({ className }) {
  const [hover, setHover] = useState(false);
  const isMobile = useMobile();

  const timeoutRef = useRef();

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setHover(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHover(false);
    }, 500);
  };

  const tooltipContent = (
    <>
      <div className="flex gap-[8px]">
        <div className="w-[24px]">
          <SpeedometerSvg />
        </div>
        <p className="font-normal text-[16px] leading-[1.2] tracking-[-0.5px] text-grey-black">
          The portfolio model takes the risk score to determine the most
          relevant DeFi pools from a risk-reward perspective.
        </p>
      </div>
      <div className="flex gap-[8px]">
        <div className="w-[24px]">
          <WorkflowSvg />
        </div>
        <p className="font-normal text-[16px] leading-[1.2] tracking-[-0.5px] text-grey-black">
          The general methodology behind portfolio construction is Equal Sharpe
          Ratio Contributions (ESRC).
        </p>
      </div>
      <div className="flex gap-[8px]">
        <div className="w-[24px]">
          <DatabaseSvg />
        </div>
        <p className="font-normal text-[16px] leading-[1.2] tracking-[-0.5px] text-grey-black">
          So far, there are over 800 DeFi pools from 160+ protocols across 12
          chains in One Click's database.
        </p>
      </div>
      <div className="flex gap-[8px]">
        <div className="w-[24px]">
          <HistorySvg />
        </div>
        <p className="font-normal text-[16px] leading-[1.2] tracking-[-0.5px] text-grey-black">
          The model also takes into account user's on-chain interaction history
          with protocols and assets to generate a more personalized portfolio.
        </p>
      </div>
      <div className={`pl-[32px] ${isMobile ? "text-center" : "text-left"}`}>
        <a
          href="https://medium.com/oneclickcrypto/1cc-defi-portfolio-model-v1-b770082df9a3"
          target="_blank"
          rel="noreferrer"
          className="text-yellow-dark hover:text-yellow-deep font-bold text-[14px] leading-[1.1] font-caption"
        >
          Read full whitepaper
        </a>
      </div>
    </>
  );

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center gap-[7px] font-normal text-[14px] leading-[1.2] tracking-[-0.5px] transition-colors duration-300 ${className}`}
    >
      <WarningHexagonSvg
        className={hover ? "stroke-yellow-darkest" : "stroke-yellow-dark"}
      />
      <span
        className={`cursor-default ${
          hover ? "text-yellow-darkest" : "text-yellow-dark"
        }`}
      >
        How it works?
      </span>
      {!isMobile && (
        <Tooltip
          tipShadow
          show={hover}
          className="w-[434px] top-[40px] before:right-[40px] before:w-[16px] before:h-[16px] before:top-[-8px] before:shadow-sm-grey"
        >
          <div className="!p-[16px] bg-white flex flex-col gap-[32px]">
            {tooltipContent}
          </div>
        </Tooltip>
      )}
      {isMobile && hover && (
        <div className="fixed top-0 left-0 w-full h-full bg-white px-[24px] pt-[81px] z-50 animate-fadeIn">
          <button
            onClick={() => setHover(false)}
            className="w-[12px] h-[12px] absolute top-[49px] lg:top-[22px] right-[30px] flex justify-center items-center bg-none border-none"
          >
            <CloseIcon />
          </button>
          <h3 className="text-[32px] text-center font-medium">How it works?</h3>
          <div className="flex flex-col gap-[32px] mt-[24px] text-left">
            {tooltipContent}
          </div>
        </div>
      )}
    </div>
  );
}
