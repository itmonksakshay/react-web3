import { useEffect } from "react";
import { Button } from "src/components/lib";
import { ModalType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";
import { useToast } from "src/contexts/ToastContext";
import { useWallet } from "src/contexts/WalletContext";
import { ReactComponent as ConnectSvg2 } from "src/assets/img/icons/connect2.svg";
import { WalletInput } from "src/components/WalletInput";
import IllustrationImage from "src/assets/img/illustration.png";
import { ReactComponent as AISvg } from "src/assets/img/icons/ai.svg";

export function WalletIntroduction({ className }) {
  const { setWalletAddress } = useWallet();
  const { showModal } = useModal();
  const { closeToast } = useToast();

  const showConnectModal = () => showModal(ModalType.ConnectModal);

  useEffect(() => {
    return closeToast;
  }, [closeToast]);

  return (
    <div
      className={`flex justify-between gap-[62px] px-[24px] pb-[30px] lg:px-[170px] pt-[81px] lg:pt-[100px] animate-fadeIn ${className}`}
    >
      <div className="dark:text-white">
        <h2 className="text-[32px] lg:text-[44px] mt-[37px]">
          Analyze your wallet with AI
        </h2>
        <p className="text-[16px] lg:text-[24px] font-light leading-[1.2] mt-[24px] mr-[30px] tracking-[-0.5px]">
          Our AI model will analyze your wallet address and share insights about
          your on-chain profile
        </p>
        <div className="flex flex-col w-[354px] mt-[36px]">
          <Button type={16} onClick={showConnectModal}>
            <ConnectSvg2 />
            Connect Wallet & Start
          </Button>
          <div className="relative max-w-[458px] h-[1px] bg-grey-lightest-40 mt-[24.5px] after:content-['OR'] after:absolute after:text-grey-dark after:bg-white dark:after:text-white dark:after:bg-grey-dark after:left-[50%] after:px-[21px] after:-translate-x-1/2 after:-translate-y-1/2 after:text-[14px] after:leading-[1.2] after:tracking-[-0.5px]"></div>
          <WalletInput className="mt-[24.5px]" onSubmit={setWalletAddress} />
          <div className="flex items-center gap-[8px] mt-[24px]">
            <p className="text-[14px] font-normal">POWERED BY:</p>
            <div className="flex items-center gap-[4.58px]">
              <p className="font-caption font-bold text-[12px]">
                One Click Crypto
              </p>
              <AISvg />
            </div>
          </div>
        </div>
      </div>
      <div className="min-w-[439px] mt-[-50px]">
        <img src={IllustrationImage} alt="Illustration" className="w-full" />
      </div>
    </div>
  );
}
