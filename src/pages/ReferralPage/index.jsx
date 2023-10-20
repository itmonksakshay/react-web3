import { Footer } from "src/layout/Footer";
import { Header } from "src/layout/Header";
import { ExploreCard } from "./components/ExploreCard";
import { ReferralLinksCard } from "./components/ReferralLinksCard";
import { StatsCard } from "./components/StatsCard";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleImg from "src/assets/img/article.png";
import ArticleImg2 from "src/assets/img/article2.png";
import ScreenshotImg from "src/assets/img/screenshot.png";
import ScreenshotImg2 from "src/assets/img/screenshot2.png";
import {
  ConnectModal,
  DisconnectModal,
  JoinModal,
} from "src/components/modals";
import { ModalType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";
import { useWallet } from "src/contexts/WalletContext";
import { useReferralData } from "src/hooks/useReferralData";
import { Introduction } from "../Home/sections/Introduction";

export function ReferralPage() {
  const [joined, setJoined] = useState(false);

  const { walletAddress, disconnect } = useWallet();
  const { showModal, modalType, closeModal } = useModal();
  const navigate = useNavigate();

  const { referralData, getReferralData, isLoading } = useReferralData();

  useEffect(() => {
    if (!walletAddress) {
      showModal(ModalType.ConnectModal);
      return;
    }
    closeModal();
  }, [closeModal, showModal, walletAddress]);

  useEffect(() => {
    if (!walletAddress) return;
    getReferralData(walletAddress);
  }, [getReferralData, walletAddress]);

  const handleExplore = () => {
    navigate("/");
  };

  const handleDisconnect = () => {
    disconnect();
    closeModal();
    setTimeout(() => navigate("/"), 0);
  };

  const handleJoinSuccess = () => {
    setJoined(true);
    getReferralData(walletAddress);
  };

  const handleCloseJoinModal = () => {
    closeModal();
    setTimeout(() => navigate("/"), 0);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        {walletAddress && referralData?.ok && !isLoading ? (
          <>
            <Header />
            <div className="flex flex-col gap-[24px] px-[24px] lg:px-[64px] mt-[16px] lg:mt-[34px] animate-fadeIn">
              <div className="flex flex-col lg:flex-row gap-[24px]">
                <StatsCard
                  data={{
                    lastUpdatedAt: new Date(),
                    boostLevel: referralData.boost,
                    totalWaitlist: referralData.totalWaitlist,
                  }}
                  className="grow"
                />
                <ReferralLinksCard
                  data={referralData.referrals}
                  className="grow-[3]"
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-[24px]">
                <ExploreCard
                  title="Explore how it works"
                  description="Read this article to understand the main logic of the One Click Airdrop and Referral program."
                  image={ArticleImg}
                  image2={ArticleImg2}
                  link="https://medium.com/oneclickcrypto/announcing-one-click-crypto-token-airdrop-2-4m-community-pool-6dc5099b26c0"
                  className="grow"
                />
                <ExploreCard
                  title="Personalize your DeFi portfolio"
                  description="Our AI will analyze your on-chain history and make a personalized recommendation based on your profile."
                  image={ScreenshotImg}
                  image2={ScreenshotImg2}
                  onLinkClick={handleExplore}
                  className="grow"
                />
              </div>
            </div>
          </>
        ) : (
          <Introduction isLoading={isLoading} />
        )}
        <div className="mt-auto pt-[72px]">
          <Footer />
        </div>
      </div>
      {modalType === ModalType.ConnectModal && <ConnectModal />}
      {modalType === ModalType.DisconnectModal && (
        <DisconnectModal handleDisconnect={handleDisconnect} />
      )}
      {referralData && !referralData.ok && !joined && (
        <JoinModal
          onSuccess={handleJoinSuccess}
          onClose={handleCloseJoinModal}
        />
      )}
    </>
  );
}
