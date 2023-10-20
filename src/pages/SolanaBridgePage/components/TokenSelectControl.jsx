import { ChainLogo } from "src/pages/Home/sections/Result2/components/ChainLogo";
import { ReactComponent as DownArrowSvg } from "src/assets/img/icons/down-arrow.svg";
import { AssetWithChain } from "./AssetWithChain";

export function TokenSelectControl({
  tokenSymbol,
  tokenImageId,
  chainName,
  chainImageName,
  onClick,
  className,
}) {
  return (
    <div
      className={`w-[184px] h-[54px] flex items-center p-[8px] border-grey-lightest border-[1px] rounded-[8px] cursor-pointer hover:bg-yellow-mild transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      <AssetWithChain
        tokenImageId={tokenImageId}
        tokenSymbol={tokenSymbol}
        chainImageName={chainImageName}
      />
      <div className="ml-[8px]">
        <p className="font-caption text-[20px] leading-[1.14] text-grey-black">
          {tokenSymbol}
        </p>
        <p className="font-normal text-[12px] leading-[1.25] text-grey-deep">
          from {chainName}
        </p>
      </div>
      <DownArrowSvg width={16} className="ml-auto fill-black" />
    </div>
  );
}
