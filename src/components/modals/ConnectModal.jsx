import { ReactComponent as MetaMaskIcon } from "src/assets/img/icons/Metamask.svg";
import { ReactComponent as TrustWalletIcon } from "src/assets/img/icons/TrustWallet.svg";
import { ReactComponent as WalletConnectIcon } from "src/assets/img/icons/WalletConnect.svg";
import { ReactComponent as CloseIcon } from "src/assets/img/icons/close.svg";
import { WalletType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";
import { useWallet } from "src/contexts/WalletContext";

function WalletOption({ icon, label, connect }) {
  return (
    <div className="flex items-center bg-white dark:bg-grey-dark h-[51px] px-[18px] border-[0.817044px] border-grey-lighter2 dark:border-grey-darker3 rounded-[6.53635px] hover:bg-grey-bright dark:hover:bg-grey-black [&>button]:hidden [&:hover>button]:block transition-all duration-300">
      <div className="w-[40px]">{icon}</div>
      <p className="font-caption leading-[1.46] text-grey-dark dark:text-white">
        {label}
      </p>
      <button
        className="border-none bg-none text-[14px] font-body font-bold text-grey-black dark:text-white ml-auto"
        onClick={connect}
      >
        Connect
      </button>
    </div>
  );
}

export function ConnectModal() {
  const { connect } = useWallet();
  const { closeModal } = useModal();

  return (
    <div className="fixed top-0 left-0 z-20 w-full h-full animate-fadeIn bg-grey-black43">
      <div className="absolute bg-texture bg-cover bg-white dark:bg-grey-dark lg:bg-none w-full lg:w-auto h-full lg:h-auto pt-[81px] lg:pt-[40px] pb-[24px] px-[24px] top-0 lg:top-[171px] left-0 lg:left-1/2 lg:-translate-x-1/2 lg:rounded-[8px]">
        <h3 className="text-[32px] text-grey-dark dark:text-white text-center">
          Connect Wallet
        </h3>
        <button
          onClick={closeModal}
          className="w-[12px] h-[12px] absolute top-[49px] lg:top-[22px] right-[30px] flex justify-center items-center bg-none border-none"
        >
          <CloseIcon className="stroke-grey-black dark:stroke-grey-deep" />
        </button>
        <div className="flex flex-col gap-[16px] mt-[29px] lg:w-[376px]">
          <WalletOption
            icon={<MetaMaskIcon />}
            label="Metamask"
            connect={() => connect(WalletType.Metamask)}
          />
          <WalletOption
            icon={<WalletConnectIcon />}
            label="WalletConnect"
            connect={() => connect(WalletType.WalletConnect)}
          />
          <WalletOption
            icon={<TrustWalletIcon />}
            label="Trust Wallet"
            connect={() => connect(WalletType.TrustWallet)}
          />
        </div>
      </div>
    </div>
  );
}
