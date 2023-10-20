import { ReactComponent as LogoSvg } from "src/assets/img/icons/loader-hexagon.svg";
import TextureImage from "../assets/img/progress-texture.png";

export function ProgressBar({ progress, width, iconWidth, height, className }) {
  const padding = iconWidth / 2;

  return (
    <div
      className={`relative rounded-full border-[2px] border-yellow-dark p-[5px] shadow-sm ${className}`}
      style={{
        width,
        height,
      }}
    >
      <div
        className="w-full h-full transition-all bg-repeat-x rounded-full shadow-sm bg-left-10 bg-yellow-dark"
        style={{
          backgroundImage: `url(${TextureImage})`,
          width: padding + ((width - padding * 2) * progress) / 100,
        }}
      ></div>
      <div
        className="absolute transition-all -translate-x-1/2 -translate-y-1/2 top-1/2"
        style={{
          width: iconWidth,
          left: padding + ((width - padding * 2) * progress) / 100,
        }}
      >
        <LogoSvg
          className="w-full h-full"
        />
        <div className="absolute font-caption text-white text-[16px] left-[calc(50%+1px)] top-[calc(50%-1px)] -translate-x-1/2 -translate-y-1/2">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}
