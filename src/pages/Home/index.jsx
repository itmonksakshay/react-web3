import axios from "axios";
import { useEffect, useRef, useState } from "react";
import * as Loader from "react-spinners";
import { ReactComponent as WarningHexagonSvg } from "src/assets/img/icons/warning-hexagon.svg";
import { Toast } from "src/components/Toast";
import {
  ConfirmModal,
  ConnectModal,
  DisconnectModal,
  JoinModal,
  SkipModal,
  TermsModal,
  ThanksModal,
} from "src/components/modals";
import { SkipQuestionModal } from "src/components/modals/SkipQuestionModal";
import { ModalType, WalletType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";
import { useToast } from "src/contexts/ToastContext";
import { useWallet } from "src/contexts/WalletContext";
import { useLatestPorfolio } from "src/hooks/useLatestPortfolio";
import { useMobile } from "src/hooks/useMobile";
import { useProgress } from "src/hooks/useProgress";
import { useRiskTrendings } from "src/hooks/useRiskTrendings";
import { Footer } from "src/layout/Footer";
import { Introduction } from "./sections/Introduction";
import { Loading } from "./sections/Loading";
import { Questioning } from "./sections/Questioning";
import { Result } from "./sections/Result";
import { WalletIntroduction } from "./sections/WalletIntroduction";
import { WalletAnalysisResult } from "./sections/WalletAnalysisResult";
import { useNavigate } from "react-router-dom";
import { useWalletAnalysis } from "src/hooks/useWalletAnalysis";

export function Home({ isWalletAnalysisMode = false, isDemo = false }) {
  const { walletType, walletAddress, setWalletAddress, disconnect } =
    useWallet();
  const { showModal, modalType, closeModal } = useModal();
  const { showingToast, showToast } = useToast();
  const isMobile = useMobile();

  useEffect(() => {
    if (!localStorage.getItem("agreed")) showModal(ModalType.TermsModal);
  }, [showModal]);

  const {
    latestPortfolio,
    isLoaded: isLoadedLatestPortfolio,
    isLoading: isLoadingLatestPortfolio,
    getLatestPortfolio,
    resetLatestPortfolio,
  } = useLatestPorfolio();

  const {
    walletAnalysis,
    getWalletAnalysis,
    error: errorLoadingWalletAnalysis,
    isLoading: isLoadingWalletAnalysis,
    resetWalletAnalysis,
  } = useWalletAnalysis();

  const {
    progress: scanningProgress,
    start: startScanning,
    reset: resetScanning,
    isCompleted: scanningCompleted,
  } = useProgress();

  const {
    progress: analyzingProgress,
    start: startAnalyzing,
    stop: stopAnalyzing,
    reset: resetAnalyzing,
    started: analyzingStarted,
    isCompleted: analyzingCompleted,
  } = useProgress();

  const {
    progress: walletScanningProgress,
    start: startWalletScanning,
    reset: resetWalletScanning,
    stop: stopWalletScanning,
    started: walletScanningStarted,
    isCompleted: walletScanningCompleted,
  } = useProgress({ waitFor: walletAnalysis });

  const [answers, setAnswers] = useState([]);
  const [riskScore, setRiskScore] = useState(-1);
  const [skip, setSkip] = useState(false);
  const [skipQuestion, setSkipQuestion] = useState(false);
  const [error, setError] = useState("");

  const { riskTrendings, getRiskTrendings } = useRiskTrendings();

  const navigate = useNavigate();

  const answersRef = useRef(answers);
  answersRef.current = answers;

  const handleFinishQuestioning = () => {
    startAnalyzing();
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/questionnare/risk-score`, {
        wallet_address: walletAddress,
        answers: answersRef.current,
      })
      .then((response) => {
        setRiskScore(response.data.risk_score);
      })
      .catch((e) => {
        setError(e.message);
        stopAnalyzing();
      });
  };

  const reset = () => {
    closeModal();
    setError("");
    setSkip(false);
    setSkipQuestion(false);
    resetLatestPortfolio();
    resetScanning();
    resetAnalyzing();
    resetWalletScanning();
    resetWalletAnalysis();
    setAnswers([]);
    setRiskScore(-1);
  };

  const handleDisconnect = () => {
    if (walletAddress) showToast();
    disconnect();
    reset();
  };

  const handelWalletSubmit = (newWallet) => {
    setWalletAddress(newWallet);
  };

  const handleSkip = () => {
    setSkip(true);
    closeModal();
  };

  const handleSkipQuestion = () => {
    setSkipQuestion(true);
    setRiskScore(5);
    closeModal();
  };

  const handleGoToDemo = () => {
    disconnect();
    reset();
    setSkip(true);
    setSkipQuestion(true);
    setRiskScore(5);
  };

  const handleLogoClick = () => {
    if (!walletAddress && !skip) window.location.href = "https://oneclick.fi";
    else {
      showModal(ModalType.RestartModal);
    }
  };

  const handleGoToWalletAnalyze = () => {
    handleDisconnect();
    setTimeout(() => navigate("/ai-scanner"), 0);
  };

  const handleGoToMain = () => {
    handleDisconnect();
    setTimeout(() => navigate("/"), 0);
  };

  useEffect(() => {
    if (!walletAddress) return;
    if (isWalletAnalysisMode) {
      startWalletScanning();
      getWalletAnalysis(walletAddress);
      closeModal();
    } else {
      getLatestPortfolio({
        walletAddress,
        onSuccess: (portfolio) => setRiskScore(portfolio.risk_score),
      });
      if (modalType !== ModalType.SkipModal) closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress, isWalletAnalysisMode]);

  useEffect(() => {
    if (!isLoadedLatestPortfolio) return;
    if (!latestPortfolio) {
      startScanning();
    }
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadedLatestPortfolio, latestPortfolio]);

  useEffect(() => {
    getRiskTrendings();
  }, [getRiskTrendings]);

  useEffect(() => {
    if (errorLoadingWalletAnalysis) stopWalletScanning();
  }, [errorLoadingWalletAnalysis, stopWalletScanning]);

  return (
    <>
      <div
        className={`flex flex-col h-full ${
          modalType === ModalType.SkipModal ||
          modalType === ModalType.SkipQuestionModal ||
          modalType === ModalType.RestartModal ||
          modalType === ModalType.WalletAnalyzeModal ||
          modalType === ModalType.ThanksModal ||
          modalType === ModalType.TermsModal
            ? "blur-md"
            : ""
        }`}
      >
        {isWalletAnalysisMode && !walletAddress && <WalletIntroduction />}
        {isWalletAnalysisMode &&
          walletAddress &&
          walletScanningStarted &&
          (!walletScanningCompleted || isLoadingWalletAnalysis) && (
            <Loading
              progress={walletScanningProgress}
              title="Analyzing your data..."
              description={`We are scanning your wallet and showing it to our<br>AI model. Please wait...`}
              error={errorLoadingWalletAnalysis}
              retryOnError={false}
            />
          )}
        {isWalletAnalysisMode &&
          walletAddress &&
          walletScanningCompleted &&
          walletAnalysis && (
            <WalletAnalysisResult walletAnalysis={walletAnalysis} />
          )}
        {!isWalletAnalysisMode &&
          ((!walletAddress && !skip) ||
            (walletAddress && !isLoadedLatestPortfolio)) && (
            <Introduction isLoading={isLoadingLatestPortfolio} />
          )}
        {!isWalletAnalysisMode &&
          walletAddress &&
          !scanningCompleted &&
          isLoadedLatestPortfolio &&
          !latestPortfolio && (
            <Loading
              progress={scanningProgress}
              title="Hold on..."
              description={`Beep Boop... our systems need a moment to${
                isMobile ? " " : "<br>"
              }scan your blockchain history`}
            />
          )}
        {!isWalletAnalysisMode &&
          ((walletAddress && scanningCompleted) || skip) &&
          !analyzingStarted &&
          !skipQuestion && (
            <Questioning
              answers={answers}
              setAnswers={setAnswers}
              onFinish={handleFinishQuestioning}
            />
          )}
        {!isWalletAnalysisMode &&
          ((walletAddress && scanningCompleted) || skip) &&
          analyzingStarted &&
          (!analyzingCompleted || riskScore === -1) && (
            <Loading
              progress={analyzingProgress}
              title="Analyzing your data..."
              description={`We're getting close, anon. You will see your score in a${
                isMobile ? " " : "<br>"
              }moment...`}
              error={error}
              goToDemo={handleGoToDemo}
            />
          )}
        {!isWalletAnalysisMode &&
          ((((walletAddress && scanningCompleted) || skip) &&
            (analyzingCompleted || skipQuestion) &&
            riskScore > -1) ||
            latestPortfolio) &&
          (riskTrendings ? (
            <Result
              skipQuestion={skipQuestion}
              riskScore={riskScore}
              latestPortfolio={latestPortfolio}
              riskTrendings={riskTrendings}
              setRiskScore={setRiskScore}
              goToDemo={handleGoToDemo}
              disconnect={handleDisconnect}
              isDemo={isDemo}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <Loader.PuffLoader color="black" size={70} />
            </div>
          ))}
        <div className="mt-auto pt-[72px]">
          {showingToast && (
            <Toast
              title="Wallet has been disconnected"
              description="Reconnect your wallet to start again"
              IconSvg={WarningHexagonSvg}
              className="mt-[-24px] mb-[20px] lg:mb-0"
            />
          )}
          <Footer onLogoClick={handleLogoClick} />
        </div>
      </div>
      {modalType === ModalType.ConnectModal && <ConnectModal />}
      {modalType === ModalType.DisconnectModal && (
        <DisconnectModal handleDisconnect={handleDisconnect} />
      )}
      {modalType === ModalType.JoinModal && <JoinModal />}
      {modalType === ModalType.ThanksModal && <ThanksModal />}
      {modalType === ModalType.SkipModal && (
        <SkipModal
          isLoading={isLoadingLatestPortfolio && walletType === WalletType.None}
          handleSkip={handleSkip}
          handelWalletSubmit={handelWalletSubmit}
        />
      )}
      {modalType === ModalType.SkipQuestionModal && (
        <SkipQuestionModal handleSkip={handleSkipQuestion} />
      )}
      {modalType === ModalType.RestartModal && (
        <ConfirmModal
          title="Start again?"
          description="Are you sure you want to reset your progress and create a new portfolio again?"
          cancelButtonLabel="Back"
          confirmButtonLabel="Start Again"
          onConfirm={handleGoToMain}
        />
      )}
      {modalType === ModalType.WalletAnalyzeModal && (
        <ConfirmModal
          title="Analyze Wallet"
          description="Are you sure you want to reset your progress and analyze wallet with AI?"
          cancelButtonLabel="Back"
          confirmButtonLabel="Go"
          onConfirm={handleGoToWalletAnalyze}
        />
      )}
      {modalType === ModalType.TermsModal && <TermsModal />}
    </>
  );
}
