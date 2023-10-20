import { ReactComponent as ConnectedSvg } from "src/assets/img/icons/connected.svg";
import { ReactComponent as ConnectedSvg2 } from "src/assets/img/icons/connected2.svg";
import { ReactComponent as DarkModeSvg } from "src/assets/img/icons/dark-mode.svg";
import { ReactComponent as LightModeSvg } from "src/assets/img/icons/light-mode.svg";
import { NavigationBar } from "src/components/NavigationBar";
import { Button, Logo } from "src/components/lib";
import { ModalType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";
import { useWallet } from "src/contexts/WalletContext";
import { formatAddress, toggleDarkMode } from "src/utils/helpers";

export function Header() {
  const { walletAddress } = useWallet();
  const { showModal } = useModal();

  console.log("walletaddress in header:", walletAddress);

  return (
    <div className="flex items-center px-[24px] lg:px-[64px] py-[12px] lg:py-[14px]">
      <Logo className="w-[45%] lg:w-auto" />
      <NavigationBar className="hidden ml-auto lg:flex" />
      <div className="ml-auto flex gap-[8px]">
        <Button
          type={2}
          className="group !w-[40px] hover:!bg-grey-dark hover:border-yellow-dark hover:dark:!bg-yellow-deep"
          onClick={toggleDarkMode}
        >
          <LightModeSvg className="hidden dark:block fill-yellow-dark group-hover:fill-grey-black" />
          <DarkModeSvg className="dark:hidden fill-grey-dark group-hover:fill-yellow-dark" />
        </Button>
        {walletAddress ? (
          <Button
            type={2}
            className="group"
            onClick={() => showModal(ModalType.DisconnectModal)}
          >
            <ConnectedSvg className="group-hover:hidden" />
            <ConnectedSvg2 className="hidden group-hover:block" />
            <span className="hidden lg:inline">
              {formatAddress(walletAddress)}
            </span>
          </Button>
        ) : (
          <>
            <Button
              type={1}
              className="hidden lg:flex"
              onClick={() => showModal(ModalType.ConnectModal)}
            >
              Connect a wallet
            </Button>
            <Button
              type={2}
              className="lg:hidden"
              onClick={() => showModal(ModalType.ConnectModal)}
            >
              <ConnectedSvg className="group-hover:hidden" />
              <ConnectedSvg2 className="hidden group-hover:block" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
