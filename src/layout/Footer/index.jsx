/* eslint-disable jsx-a11y/anchor-is-valid */
import { ReactComponent as ConnectedSvg } from "src/assets/img/icons/connected.svg";
import { ReactComponent as ConnectedSvg2 } from "src/assets/img/icons/connected2.svg";
import { ReactComponent as LightModeSvg } from "src/assets/img/icons/light-mode.svg";
import { ReactComponent as DarkModeSvg } from "src/assets/img/icons/dark-mode.svg";
import { ReactComponent as DiscordSvg } from "src/assets/img/icons/discord.svg";
import { ReactComponent as MediumSvg } from "src/assets/img/icons/medium.svg";
import { ReactComponent as TwitterSvg } from "src/assets/img/icons/twitter.svg";
import { ReactComponent as YoutubeSvg } from "src/assets/img/icons/youtube.svg";
import { NavigationBar } from "src/components/NavigationBar";
import { Button, Link, Logo, SocialLink } from "src/components/lib";
import { ModalType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";
import { useWallet } from "src/contexts/WalletContext";
import { formatAddress, toggleDarkMode } from "src/utils/helpers";

export function Footer({ onLogoClick, className }) {
  const { walletAddress } = useWallet();
  const { showModal } = useModal();

  return (
    <div
      className={`px-[24px] pb-[30px] lg:px-[170px] lg:pt-[17px] lg:pb-[32.5px] ${className}`}
    >
      <div className="relative flex flex-col lg:flex-row lg:items-center gap-[20px] lg:gap-[5px]">
        <div className="flex items-center">
          <Logo onClick={onLogoClick} className="w-[45%] lg:w-auto" />
          <div className="flex gap-[8px] ml-auto lg:hidden">
            <Button
              type={2}
              className="group !w-[40px] hover:!bg-grey-dark hover:border-yellow-dark hover:dark:!bg-yellow-deep"
              onClick={toggleDarkMode}
            >
              <LightModeSvg className="hidden dark:block fill-yellow-dark group-hover:fill-grey-black" />
              <DarkModeSvg className="dark:hidden fill-grey-dark group-hover:fill-yellow-dark" />
            </Button>
            {walletAddress && (
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
            )}
          </div>
        </div>
        <NavigationBar
          onLogoClick={onLogoClick}
          className="lg:absolute lg:-translate-x-1/2 lg:-translate-y-1/2 lg:left-1/2 top-1/2"
        />
        <div className="flex gap-[5px] justify-between lg:justify-start lg:ml-auto">
          <SocialLink
            link="https://twitter.com/oneclickcrypto"
            icon={
              <TwitterSvg className="transition-all duration-300 fill-grey-dark dark:fill-grey-deep hover:fill-yellow-dark dark:hover:fill-yellow-dark" />
            }
          />
          <SocialLink
            link="https://discord.gg/nJREqWnCyd"
            icon={
              <DiscordSvg className="transition-all duration-300 fill-grey-dark dark:fill-grey-deep hover:fill-yellow-dark dark:hover:fill-yellow-dark" />
            }
          />
          <SocialLink
            link="https://medium.com/oneclickcrypto"
            icon={
              <MediumSvg className="transition-all duration-300 fill-grey-dark dark:fill-grey-deep hover:fill-yellow-dark dark:hover:fill-yellow-dark" />
            }
          />
          <SocialLink
            link="https://www.youtube.com/@oneclickcrypto"
            icon={
              <YoutubeSvg className="transition-all duration-300 fill-grey-dark dark:fill-grey-deep hover:fill-yellow-dark dark:hover:fill-yellow-dark" />
            }
          />
        </div>
      </div>
      <div className="relative flex flex-wrap items-center gap-[24px] mt-[24px] lg:mt-[27.5px]">
        <Link href="https://www.oneclick.fi/terms-of-service-defi" id="term-link">
          Terms of Service
        </Link>
        <Link
          href="https://www.oneclick.fi/privacy-policy-defi"
          className="ml-auto lg:ml-0"
        >
          Privacy Policy
        </Link>
        <div className="absolute hidden -translate-x-1/2 -translate-y-1/2 lg:flex left-1/2 top-1/2 gap-[8px]">
          <Button
            type={2}
            className="group !w-[40px] hover:!bg-grey-dark hover:border-yellow-dark hover:dark:!bg-yellow-deep"
            onClick={toggleDarkMode}
          >
            <LightModeSvg className="hidden dark:block fill-yellow-dark group-hover:fill-grey-black" />
            <DarkModeSvg className="dark:hidden fill-grey-dark group-hover:fill-yellow-dark" />
          </Button>
          {walletAddress && (
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
          )}
        </div>
        <p className="lg:ml-auto uppercase text-grey-lighter dark:text-grey-deep font-normal text-[12px] leading-[1.25]">
          copyright &copy; 2023 all rights reserved
        </p>
      </div>
    </div>
  );
}
