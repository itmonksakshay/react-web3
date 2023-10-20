import { ChainLogo } from "src/pages/Home/sections/Result2/components/ChainLogo";

export function AssetWithChain({
  tokenImageId,
  tokenSymbol,
  chainImageName,
  size = 36,
}) {
  return (
    <div className="relative">
      <img
        src={`/images/assets/Logo-${tokenImageId}.png`}
        alt={tokenSymbol}
        style={{ width: size, height: size }}
      />
      <ChainLogo
        chain={chainImageName}
        size={size / 2}
        className="absolute bottom-0 right-[-2px]"
      />
    </div>
  );
}
