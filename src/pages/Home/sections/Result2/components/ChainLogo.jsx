import ArbitrumLogoImage from "src/assets/img/icons/chain-logos/Arbitrum.png";
import AvalancheLogoImage from "src/assets/img/icons/chain-logos/Avalanche.png";
import BSCLogoImage from "src/assets/img/icons/chain-logos/BSC.png";
import EthereumLogoImage from "src/assets/img/icons/chain-logos/Ethereum.png";
import FantomLogoImage from "src/assets/img/icons/chain-logos/Fantom.png";
import OptimismLogoImage from "src/assets/img/icons/chain-logos/Optimism.png";
import PolygonLogoImage from "src/assets/img/icons/chain-logos/Polygon.png";
import SolanaLogoImage from "src/assets/img/icons/chain-logos/Solana.png";
import CronosLogoImage from "src/assets/img/icons/chain-logos/Cronos.png";
import DeFiChainLogoImage from "src/assets/img/icons/chain-logos/DeFiChain.png";
import WavesLogoImage from "src/assets/img/icons/chain-logos/Waves.png";
import TronLogoImage from "src/assets/img/icons/chain-logos/Tron.png";
import MoonriverLogoImage from "src/assets/img/icons/chain-logos/Moonriver.png";
import MoonbeamLogoImage from "src/assets/img/icons/chain-logos/Moonbeam.png";
import AllImage from "src/assets/img/icons/chain-logos/all.png";

export function ChainLogo({ chain, size = 16, style = {}, className }) {
  let imageUrl = AllImage;
  if (chain === "Ethereum") {
    imageUrl = EthereumLogoImage;
  }
  if (chain === "Optimism") {
    imageUrl = OptimismLogoImage;
  }
  if (chain === "Fantom") {
    imageUrl = FantomLogoImage;
  }
  if (chain === "BNB Chain") {
    imageUrl = BSCLogoImage;
  }
  if (chain === "Arbitrum") {
    imageUrl = ArbitrumLogoImage;
  }
  if (chain === "Avalanche") {
    imageUrl = AvalancheLogoImage;
  }
  if (chain === "Polygon") {
    imageUrl = PolygonLogoImage;
  }
  if (chain === "Solana") {
    imageUrl = SolanaLogoImage;
  }
  if (chain === "Cronos") {
    imageUrl = CronosLogoImage;
  }
  if (chain === "DeFiChain") {
    imageUrl = DeFiChainLogoImage;
  }
  if (chain === "Waves") {
    imageUrl = WavesLogoImage;
  }
  if (chain === "Tron") {
    imageUrl = TronLogoImage;
  }
  if (chain === "Moonriver") {
    imageUrl = MoonriverLogoImage;
  }
  if (chain === "Moonbeam") {
    imageUrl = MoonbeamLogoImage;
  }
  return (
    <div
      className={`bg-cover ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${imageUrl})`,
        ...style,
      }}
    ></div>
  );
}
