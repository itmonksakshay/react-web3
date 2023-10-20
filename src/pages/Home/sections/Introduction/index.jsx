import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { ReactComponent as ConnectSvg } from "src/assets/img/icons/connect.svg";
import { ReactComponent as TimerSvg } from "src/assets/img/icons/timer.svg";
import { WalletInput } from "src/components/WalletInput";
import { Button } from "src/components/lib";
import { ModalType, WalletType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";
import { useToast } from "src/contexts/ToastContext";
import { useWallet } from "src/contexts/WalletContext";

export function Introduction({ isLoading = false, className }) {
  const { setWalletAddress, walletType } = useWallet();
  const { modalType, showModal } = useModal();
  const { closeToast } = useToast();

  const showConnectModal = () => showModal(ModalType.ConnectModal);
  const showSkipModal = () => showModal(ModalType.SkipModal);

  useEffect(() => {
    return closeToast;
  }, [closeToast]);

  return (
    <div className="pt-[81px] lg:pt-[100px] animate-fadeIn">
      <div
        className={`text-center dark:text-white w-full lg:w-[748px] px-[24px] lg:px-0 mx-auto ${className}`}
      >
        <h2 className="text-[32px] lg:text-[44px]">
          Personalize your DeFi portfolio
        </h2>
        <p className="text-[16px] lg:text-[24px] lg:max-w-[614px] mx-auto font-normal lg:font-light leading-[1.2] mt-[24px]">
          Use our AI to analyze your on-chain history and build a portfolio
          tailored to your risk appetite.
        </p>
        <Button
          type={3}
          className="mx-auto mt-[24px] lg:mt-[56px]"
          onClick={showConnectModal}
          disabled={isLoading && walletType !== WalletType.None}
        >
          {isLoading && walletType !== WalletType.None ? (
            <ClipLoader color="#1E1E1E" size={20} />
          ) : (
            <ConnectSvg />
          )}
          Connect Wallet & Start
        </Button>
        <div className="relative max-w-[458px] h-[1px] mx-auto bg-grey-lightest-40 mt-[32.5px] after:content-['OR'] after:absolute after:text-grey-dark after:bg-white after:transition-all after:duration-300 dark:after:text-white dark:after:bg-grey-dark after:left-[50%] after:px-[21px] after:-translate-x-1/2 after:-translate-y-1/2 after:text-[14px] after:leading-[1.2] after:tracking-[-0.5px]"></div>
        <WalletInput
          className="mx-auto mt-[23.5px] lg:mt-[31.5px]"
          isLoading={
            isLoading &&
            walletType === WalletType.None &&
            modalType !== ModalType.SkipModal
          }
          onSubmit={setWalletAddress}
        />
        <div className="flex items-center justify-center gap-[8px] mt-[16px] lg:mt-[24px]">
          <p className="text-[16px] leading-[1.39] font-normal">
            Don't have a wallet?
          </p>
          <Button type={4} onClick={showSkipModal}>
            View Demo
          </Button>
        </div>
        <div className="flex items-center justify-center gap-[4px] text-[12px] font-normal leading-[1.25] mt-[39.5px]">
          <TimerSvg />
          Takes less than 2 minutes
        </div>
      </div>
    </div>
  );
}
