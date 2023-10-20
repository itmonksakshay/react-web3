import { useToast } from "src/contexts/ToastContext";
import { ReactComponent as CloseIcon } from "../assets/img/icons/close.svg";

export function Toast({ IconSvg, title, description, className }) {
  const { closeToast } = useToast();

  return (
    <div
      className={`flex items-center w-[327px] px-[16px] pt-[8px] pb-[12px] gap-[16px] rounded-[8px] bg-grey-dark dark:bg-grey-black mx-auto animate-delayedFadeIn shadow-toast z-[99999] ${className}`}
    >
      <div>
        <IconSvg className="w-[42px]" />
      </div>
      <div className="text-white">
        <p>{title}</p>
        <p className="text-[12px] leading-[1.25] font-light mt-[4px]">
          {description}
        </p>
      </div>
      <div>
        <button
          onClick={closeToast}
          className="flex justify-center items-center w-[18px] h-[18px] bg-none border-none"
        >
          <CloseIcon className="w-[8px] h-[8px] stroke-white" />
        </button>
      </div>
    </div>
  );
}
