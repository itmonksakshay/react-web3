import { ReactComponent as CloseIcon } from "src/assets/img/icons/close.svg";
import { useModal } from "src/contexts/ModalContext";
import { useWallet } from "src/contexts/WalletContext";
import { WalletInput } from "../WalletInput";
import { Button } from "../lib";

export function DisconnectModal({ handleDisconnect }) {
  const { walletAddress } = useWallet();
  const { closeModal } = useModal();

  return (
    <div className="fixed top-0 left-0 z-20 w-full h-full bg-grey-black43 animate-fadeIn">
      <div className="absolute bg-texture bg-cover bg-white dark:bg-grey-dark lg:bg-none w-full lg:w-auto h-full lg:h-auto pt-[81px] lg:pt-[44px] pb-[32px] px-[24px] lg:px-[32px] top-0 lg:top-[171px] left-0 lg:left-1/2 lg:-translate-x-1/2 lg:rounded-[8px]">
        <h3 className="text-[32px] text-grey-dark dark:text-white text-center">
          Connected Wallet
        </h3>
        <button
          onClick={closeModal}
          className="w-[12px] h-[12px] absolute top-[49px] lg:top-[26px] right-[30px] lg:right-[26px] flex justify-center items-center bg-none border-none"
        >
          <CloseIcon className="stroke-grey-black dark:stroke-grey-deep" />
        </button>
        <p className="mt-[12px] font-light text-[16px] lg:text-[18px] leading-[1.2] tracking-[-0.5px] text-grey-dark dark:text-white max-w-[617px] min-h-[67px] text-center lg:text-left">
          Disconnecting your wallet will reset your progress. Please only do so
          when you are finished or if you do not wish to continue with your
          current progress.
        </p>
        <div className="flex flex-col lg:flex-row mt-[24px] lg:mt-[16px] gap-[24px] lg:gap-[14px]">
          <WalletInput
            defaultValue={walletAddress}
            readOnly
            className="flex-grow"
          />
          <Button type={5} onClick={handleDisconnect}>
            Disconnect
          </Button>
        </div>
      </div>
    </div>
  );
}
