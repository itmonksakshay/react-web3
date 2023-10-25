import { ReactComponent as CloseIcon } from "src/assets/img/icons/close.svg";
import {ReactComponent as  SolanaLogo} from "src/assets/img/SolanaLogos.svg";
import { useModal } from "src/contexts/ModalContext";
import { Button } from "../lib";
import { isMobileDevice } from "src/utils/helpers";
import { useNavigate } from "react-router";

export function SolanaAddressModal() {
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleClose = () => {
    if (isMobileDevice()) {
      window.close();
    } else closeModal();

  };

  const linkClick = () => {
    if (isMobileDevice()) {
      window.close();
    } else closeModal();

    navigate("/swap");
    return;
  }

  return (
    <div id="solanaAddressModal" className="absolute rounded-[8px] z-10 top-[50%] w-[546px] h-[421px] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-grey-black43 animate-fadeIn">
      <div className="h-[50%] solanaAddressModal pt-[12px] rounded-t-[8px]">
        <div className="flex">
          <button
            onClick={handleClose}
            className="w-[12px] h-[12px] ml-auto mr-[6px] lg:mr-[16px] bg-none border-none"
          >
            <CloseIcon className="stroke-grey-black dark:stroke-grey-deep" />
          </button>
        </div>
        <div className="mt-[20px] w-[493px] h-[109px] rounded-[24px]">
          <SolanaLogo />
        </div>
      </div>
      <div className="h-[50%] bg-blue-customblue1 rounded-b-[8px] flex flex-col gap-[5px] items-center border-1 border-black border-solid pt-[18px] " >
        <div className="pr-32 pl-32 pt-[15px]" >
          <h3 className="text-white text-[32px] font-fontFamily-['caption'] font-medium" >
            Start Farming on Solana
          </h3>
          <p className="text-white text-left text-[12px] pb-[24px] pt-[8px]">
            Want to create this portfolio and farm yield on Solana? Bridge and convert automatically here via One Click router
          </p>
          <div onClick={linkClick} className="cursor-pointer bg-yellow-modalYellow w-[469px]  h-[53px] text-center items-center rounded-[8px] font-tactic font-medium text-[18px] pt-[16px]">
            Transfer USDT to Solana
          </div>
        </div>

      </div>

    </div>);

}