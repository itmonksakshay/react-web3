/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { ReactComponent as CloseIcon } from "src/assets/img/icons/close.svg";
import { ReactComponent as DiscordIcon } from "src/assets/img/icons/discord-alt.svg";
import { ReactComponent as InvestSvg } from "src/assets/img/icons/invest.svg";
import { ReactComponent as LetterSvg } from "src/assets/img/icons/letter.svg";
import { ReactComponent as ReferralSvg } from "src/assets/img/icons/referral.svg";
import { useDiscord } from "src/contexts/DiscordContext";
import { useModal } from "src/contexts/ModalContext";
import { useWallet } from "src/contexts/WalletContext";
import { useJoinWaitlist } from "src/hooks/useJoinWaitlist";
import { isMobileDevice } from "src/utils/helpers";
import web3 from "web3";
import { WalletInput } from "../WalletInput";
import { Button, Input } from "../lib";
import { ErrorBox } from "../lib/ErrorBox";

export function JoinModal({ referralCode = "", onSuccess, onClose }) {
  const { walletAddress } = useWallet();
  const {
    discordUser,
    isLoading: isLoadingDiscord,
    connectDiscord,
    retryDiscord,
  } = useDiscord();
  const { closeModal } = useModal();
  const { joinWaitlist, error, isLoading } = useJoinWaitlist();

  const [walletToJoin, setWalletToJoin] = useState(walletAddress);
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email) => {
    return !!email.match(
      // eslint-disable-next-line no-control-regex
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    );
  };

  const handleClick = () => {
    joinWaitlist({
      email,
      walletAddress: walletToJoin,
      discordUsername: discordUser.username,
      discordId: discordUser.id,
      discordEmail: discordUser.email,
      referralCode,
      onSuccess,
    });
  };

  const handleClose = () => {
    if (onClose) onClose();
    else {
      if (isMobileDevice()) window.close();
      else closeModal();
    }
  };

  return (
    <div className="fixed top-0 left-0 z-20 w-full h-full lg:overflow-y-auto bg-grey-black43 animate-fadeIn">
      <div className="max-w-[533px] h-full lg:h-auto overflow-y-auto bg-white dark:bg-grey-dark dark:text-white pt-[49px] lg:pt-[20px] pb-[32px] px-[24px] lg:px-[32px] lg:mt-[100px] lg:mb-[100px] lg:mx-auto lg:rounded-[8px]">
        <div className="flex">
          <button
            onClick={handleClose}
            className="w-[12px] h-[12px] ml-auto bg-none border-none"
          >
            <CloseIcon className="stroke-grey-black dark:stroke-grey-deep" />
          </button>
        </div>
        <p className="font-normal text-[12px] leading-[1.25] text-yellow-dark">
          COMING SOON
        </p>
        <h3 className="mt-[9.5px] text-[32px] leading-[1.1] lg:w-[469px]">
          Join waitlist
        </h3>
        <div className="flex gap-[38px] lg:gap-[12px] mt-[26px]">
          <div className="basis-[52px] lg:basis-[33px] order-2 lg:order-1">
            <InvestSvg className="w-[52px] h-[46px] lg:w-auto lg:h-auto" />
          </div>
          <div className="order-1 lg:order-2">
            <h6 className="font-caption text-[18px] leading-[1.46]">
              Farm with One Click and earn rewards
            </h6>
            <p className="mt-[4px] text-[12px] leading-[1.25] font-normal">
              Earn points by farming through One Click app and receive rewards
              at the end of the season.
              <br />
              <br />
              <span className="font-bold">
                Note: Link your most active wallet to get the most base points
              </span>
              <br />
              <br />
            </p>
          </div>
        </div>
        <WalletInput
          defaultValue={walletAddress}
          onChange={(v) => {
            setWalletToJoin(v);
          }}
          buttonLabel="Edit"
          className="lg:ml-[48px]"
        />
        <div className="flex gap-[38px] lg:gap-[12px] mt-[32px]">
          <div className="basis-[52px] lg:basis-[33px] order-2 lg:order-1">
            <ReferralSvg className="w-[52px] h-[47.36px] lg:w-auto lg:h-auto" />
          </div>
          <div className="order-1 lg:order-2">
            <h6 className="font-caption text-[18px] leading-[1.46]">
              Earn through referrals
            </h6>
            <p className="mt-[4px] text-[12px] leading-[1.25] font-normal max-w-[345px]">
              Get 3 invite links to share with your friends and boost your
              points by at least 50%.
              <br />
              <br />
            </p>
            {discordUser ? (
              <>
                <div className="flex items-center px-[20px] py-[14px] rounded-[8px] border-[2px] border-purple-light font-caption font-bold leading-[1.25] text-purple-light">
                  <DiscordIcon className="fill-purple-light" />
                  <span className="ml-[8px]">Connected:</span>
                  {/* <div className="rounded-full w-[20px] h-[20px] bg-grey-lighter3 ml-[8px]" /> */}
                  <img
                    className="rounded-full w-[20px] h-[20px] ml-[8px]"
                    src={discordUser.imageUrl}
                    alt="Avatar"
                  />
                  <span className="ml-[4px]">{discordUser.username}</span>
                </div>
                {discordUser && !discordUser.joined && (
                  <div className="text-red-light mt-[8px] leading-[1.5] text-center">
                    <p>
                      Please join{" "}
                      <a
                        href="https://discord.gg/nJREqWnCyd"
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        our Discord server
                      </a>{" "}
                      first
                    </p>
                    <p>
                      Joined?{" "}
                      <a
                        className="underline cursor-pointer"
                        onClick={retryDiscord}
                      >
                        Retry
                      </a>
                    </p>
                  </div>
                )}
              </>
            ) : (
              <Button type={9} className="mt-[4px]" onClick={connectDiscord}>
                <DiscordIcon />
                {isLoadingDiscord ? "Connecting..." : "Connect Discord"}
              </Button>
            )}
          </div>
        </div>
        <div className="flex gap-[38px] lg:gap-[12px] mt-[32px]">
          <div className="basis-[52px] lg:basis-[33px] order-2 lg:order-1">
            <LetterSvg className="w-[52px] h-[47.36px] lg:w-auto lg:h-auto" />
          </div>
          <div className="order-1 lg:order-2">
            <h6 className="font-caption text-[18px] leading-[1.46]">
              Exclusive invitation
            </h6>
            <p className="mt-[4px] text-[12px] leading-[1.25] font-normal">
              Wallet holders with the most points will be the first to receive
              the invitation to private beta. Join waitlist now and start
              earning points today.
              <br />
              <br />
            </p>
          </div>
        </div>
        <Input
          type="email"
          value={email}
          placeholder="Paste your email"
          onChange={handleEmailChange}
          className="lg:ml-[48px] lg:w-[calc(100%-48px)] dark:bg-transparent dark:text-white"
        />
        {error && <ErrorBox error={error} className="mt-[12px] lg:ml-[48px]" />}
        <Button
          type={10}
          className="mt-[24px] mx-auto"
          disabled={
            !discordUser?.joined ||
            isLoading ||
            !isValidEmail(email) ||
            (walletToJoin && !web3.utils.isAddress(walletToJoin)) ||
            !discordUser
          }
          onClick={handleClick}
        >
          {isLoading ? "Submitting ..." : "Confirm"}
        </Button>
      </div>
    </div>
  );
}
