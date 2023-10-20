import { useParams } from "react-router-dom";
import { ReactComponent as ProductHuntLogo } from "src/assets/img/icons/badge-logos/ProductHunt.svg";
import ScreenshotImg from "src/assets/img/screenshot.png";
import ScreenshotImg2 from "src/assets/img/screenshot2.png";
import SolanaImg from "src/assets/img/solana.png";
import TradersImg from "src/assets/img/traders.png";
import TradersImg2 from "src/assets/img/traders2.png";
import { Button, Logo } from "src/components/lib";
import { JoinModal, ThanksModal } from "src/components/modals";
import { ModalType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";
import { useSingleReferral } from "src/hooks/useSingleReferral";
import { Footer } from "src/layout/Footer";
import { Badge } from "./components/Badge";
import { useState } from "react";

export function InvitationPage() {
  const [joined, setJoined] = useState(false);

  const { modalType, showModal } = useModal();

  let { referralCode } = useParams();
  const { referral } = useSingleReferral({ referralCode });

  const handleAccept = () => {
    showModal(ModalType.JoinModal);
  };

  const handleSuccess = () => {
    setJoined(true);
  };

  return (
    <>
      <div className="flex flex-col h-full animate-fadeIn">
        <div className="flex flex-col lg:flex-row gap-[71px] px-[24px] lg:px-[64px] mt-[49px] lg:mt-[80px]">
          <div className="lg:w-1/2">
            <Logo />
            <div className="flex gap-[6.31px] mt-[16px]">
              <Badge
                title="#2 PRODUCT OF THE WEEK"
                featured="Web3"
                logo={<ProductHuntLogo />}
              />
              <Badge
                title="#3 PRODUCT OF THE WEEK"
                featured="Fintech"
                logo={<ProductHuntLogo />}
              />
            </div>
            {referral ? (
              <div className="flex gap-[4px] items-center mt-[32px]">
                <img
                  className="rounded-full w-[24px] h-[24px] ml-[8px]"
                  src={`https://cdn.discordapp.com/avatars/${referral?.referral?.invitor_discord_id}/${referral?.invitor_discord_avatar}.png`}
                  alt="Avatar"
                />
                <p className="font-caption text-[20px] leading-[1.14] dark:text-white">
                  {
                    referral?.referral?.invitor_discord_username?.split(
                      "#"
                    )?.[0]
                  }
                </p>
              </div>
            ) : (
              <div className="mt-[72px]"></div>
            )}
            <p className="font-caption text-[44px] leading-[1.1] mt-[16px] dark:text-white">
              Invited you to join One Click private beta
            </p>
            <p className="font-light text-[16px] lg:text-[24px] leading-[1.2] tracking-[-0.5px] mt-[16px] dark:text-white">
              You are now eligible to access One Click Crypto beta dashboard.
              Accept to start receiving points and get 3 extra referral links.
            </p>
            <div className="flex flex-col lg:flex-row lg:items-center gap-[32px] mt-[40px]">
              <Button
                type={3}
                className="!w-[256px]"
                onClick={handleAccept}
                disabled={joined}
              >
                Accept and Continue
              </Button>
              <div className="flex items-center gap-[14px]">
                <div className="flex flex-col gap-[1px]">
                  <p className="font-normal text-[16px] leading-[1.2] tracking-[-0.5px] text-grey-deep">
                    Trusted By
                  </p>
                  <div className="h-[34px] flex items-center">
                    <img
                      className="dark:hidden bg-cover object-cover h-[34px]"
                      src={TradersImg}
                      alt="Traders"
                    />
                    <img
                      className="hidden dark:block bg-cover object-cover h-[34px]"
                      src={TradersImg2}
                      alt="Traders"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[1px]">
                  <p className="font-normal text-[16px] leading-[1.2] tracking-[-0.5px] text-grey-deep">
                    Grant From
                  </p>
                  <div className="h-[34px] flex items-center">
                    <img
                      className="bg-cover object-cover w-[123px] dark:invert"
                      src={SolanaImg}
                      alt="Traders"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 items-end hidden lg:flex">
            <img
              src={ScreenshotImg}
              className="dark:hidden object-cover border-[0.9px] border-yellow-light rounded-[11px] shadow-xl"
              alt="screenshot"
            />
            <img
              src={ScreenshotImg2}
              className="hidden dark:block object-cover border-[0.9px] border-yellow-light rounded-[11px] shadow-xl"
              alt="screenshot"
            />
          </div>
        </div>
        <div className="mt-auto pt-[72px]">
          <Footer />
        </div>
      </div>
      {joined ? (
        <ThanksModal isJoinPage />
      ) : (
        modalType === ModalType.JoinModal && (
          <JoinModal referralCode={referralCode} onSuccess={handleSuccess} />
        )
      )}
    </>
  );
}
