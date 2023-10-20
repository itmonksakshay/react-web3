import { useState } from "react";
import { ReactComponent as CloseIcon } from "src/assets/img/icons/close.svg";
import { ChainLogo } from "src/pages/Home/sections/Result2/components/ChainLogo";

export function TokenSelectModal({
  title,
  data,
  chainIndex,
  tokenIndex,
  onSelect,
  onClose,
}) {
  const [curChainIndex, setCurChainIndex] = useState(chainIndex);
  const [curTokenIndex, setCurTokenIndex] = useState(tokenIndex);

  const handleClose = () => {
    onClose?.();
  };
  const handleChainClick = (index) => {
    setCurChainIndex(index);
    if (index === chainIndex) setCurTokenIndex(tokenIndex);
    else setCurTokenIndex(-1);
  };
  const handleTokenClick = (index) => {
    if (curChainIndex === chainIndex && index === tokenIndex) return;
    setCurTokenIndex(index);
    onSelect?.(curChainIndex, index);
  };

  return (
    <div className="fixed top-0 left-0 z-20 w-full h-full lg:overflow-y-auto bg-grey-black43 animate-fadeIn">
      <div className="max-w-[530px] h-full lg:h-auto overflow-y-auto bg-white dark:bg-grey-dark dark:text-white pt-[49px] lg:pt-[20px] pb-[32px] px-[24px] lg:mt-[100px] lg:mb-[100px] lg:mx-auto lg:rounded-[8px]">
        <div className="flex justify-between items-center">
          <h3 className="text-[32px] leading-[1.1] text-grey-dark">{title}</h3>
          <button
            onClick={handleClose}
            className="w-[24px] h-[24px] ml-auto bg-none border-none"
          >
            <CloseIcon
              className="stroke-grey-black dark:stroke-grey-deep"
              width={16}
              height={16}
            />
          </button>
        </div>
        <div className="flex gap-[14px] mt-[24px]">
          <div className="flex flex-col gap-[8px]">
            {data.map((chain, index) => (
              <div
                key={chain.chainSymbol}
                onClick={() => handleChainClick(index)}
                className={`flex items-center gap-[8px] w-[184px] h-[54px] px-[8px] rounded-[8px] border-[1px] border-grey-lightest bg-white hover:border-yellow-dark hover:bg-yellow-mild cursor-pointer transition-all duration-300 ${
                  curChainIndex === index
                    ? "border-yellow-dark bg-yellow-mild"
                    : ""
                }`}
              >
                <ChainLogo chain={chain.chainImageName} size={36} />
                <p className="text-[18px] leading-[1.46]">{chain.chainName}</p>
              </div>
            ))}
          </div>
          <div className="w-[1px] bg-grey-lightest" />
          <div className="flex flex-col gap-[8px]">
            {data[curChainIndex].tokens.map((token, index) => (
              <div
                key={token.tokenSymbol}
                onClick={() => handleTokenClick(index)}
                className={`flex items-center gap-[8px] w-[269px] h-[54px] px-[8px] rounded-[8px] border-[1px] border-white bg-white hover:bg-yellow-mild transition-all duration-300 ${
                  curTokenIndex === index ? "bg-yellow-mild" : ""
                } ${
                  index === curTokenIndex &&
                  index === tokenIndex &&
                  curChainIndex === chainIndex
                    ? ""
                    : "cursor-pointer"
                }`}
              >
                <img
                  src={`/images/assets/Logo-${token.tokenImageId}.png`}
                  alt={token.tokenSymbol}
                  className="w-[36px] h-[36px]"
                />
                <p className="text-[18px] leading-[1.46]">
                  {token.tokenSymbol}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
