/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import { useEffect, useRef, useState } from "react";
import { Rate } from "src/components/Rate";
import { Button, ErrorBox } from "src/components/lib";
import { Header } from "src/layout/Header";
import { Result2 } from "../Result2";
import { RateSlider } from "src/components/RateSlider";
import { useGeneratePortfolio } from "src/hooks/useGeneratePortfolio";
import { useWallet } from "src/contexts/WalletContext";
import { ClipLoader } from "react-spinners";

export function Result({
  latestPortfolio,
  riskScore,
  setRiskScore,
  riskTrendings,
  skipQuestion,
  disconnect,
  isDemo = false,
}) {
  const [result2, setResult2] = useState(!!latestPortfolio);
  const { walletAddress } = useWallet();
  const [showingTooltip, setShowingTooltip] = useState(false);
  const [timeoutError, setTimeoutError] = useState(false);

  const timeoutRef = useRef();
  useEffect(() => {
    if (!result2) {
      timeoutRef.current = setTimeout(() => {
        setShowingTooltip(true);
      }, 1000);
    } else {
      clearTimeout(timeoutRef.current);
      setShowingTooltip(false);
    }
    return () => {
      clearTimeout(timeoutRef.current);
      setShowingTooltip(false);
    };
  }, [result2]);

  const errorTimeoutRef = useRef();

  const handleRateChange = (value) => {
    clearTimeout(timeoutRef.current);
    setShowingTooltip(false);
    setRiskScore(value);
  };

  const {
    portfolio,
    error,
    generatePortfolio,
    resetPortfolio,
    isLoading: isLoadingPortfolio,
    cancel,
  } = useGeneratePortfolio({
    walletAddress,
    riskScore,
  });

  const {
    portfolio: demoPortfolio,
    generatePortfolio: generateDemoPortfolio,
    resetPortfolio: resetDemoPortfolio,
    isLoading: isLoadingDemo,
  } = useGeneratePortfolio({
    walletAddress: "",
    riskScore,
  });

  const riskCategory =
    riskScore <= 3
      ? "low"
      : riskScore <= 5.5
      ? "moderate"
      : riskScore <= 7.5
      ? "above average"
      : "high";

  const range = {
    low: [1, 3],
    moderate: [3.5, 5.5],
    "above average": [6, 7.5],
    high: [8, 10],
  };

  const handleGoBack = () => {
    resetPortfolio();
    resetDemoPortfolio();
    setResult2(false);
  };

  const handleClick = () => {
    setTimeoutError(false);
    resetPortfolio();
    setResult2(true);
    errorTimeoutRef.current = setTimeout(() => {
      setTimeoutError(true);
    }, 10000);
    generatePortfolio(() => clearTimeout(errorTimeoutRef.current));
  };

  const handleViewDemoPortfolio = () => {
    cancel();
    generateDemoPortfolio(() => {
      setTimeoutError(false);
      clearTimeout(errorTimeoutRef.current);
    });
  };

  return result2 &&
    (portfolio ||
      demoPortfolio ||
      (!isLoadingPortfolio && !isLoadingDemo && latestPortfolio)) ? (
    <>
      <Header />
      <Result2
        isDemo={isDemo}
        viewDemo={!portfolio && !latestPortfolio}
        analysis={{
          risk_score: riskScore,
          ...(portfolio
            ? portfolio
            : demoPortfolio
            ? demoPortfolio
            : latestPortfolio),
        }}
        goBack={handleGoBack}
      />
    </>
  ) : (
    <div className="text-center max-w-[725px] mx-auto pt-[81px] px-[24px] lg:pt-[111px] pb-[20px] lg:pb-[80px] animate-fadeIn dark:text-white">
      <Rate score={riskScore} size="large" className="mx-auto" />
      <h2 className="font-caption font-medium text-[32px] lg:text-[44px] leading-[1.1] mt-[32px] lg:mt-[48px]">
        {skipQuestion ? "Choose Your Risk Score" : "Your Risk Profile"}
      </h2>
      <p className="text-[16px] lg:text-[24px] font-light leading-[1.2] tracking-[-0.5px] mt-[24px]">
        Your risk score is {riskScore}. This is considered{" "}
        <span className="font-bold text-yellow-dark">{riskCategory}</span> risk.{" "}
        {Math.round(riskTrendings[riskCategory] * 100)}% of all One Click users
        also have a score in a range from {range[riskCategory][0]} to{" "}
        {range[riskCategory][1]}
      </p>
      <RateSlider
        value={riskScore}
        onChange={handleRateChange}
        showTooltip={showingTooltip}
        disabled={isLoadingPortfolio || isLoadingDemo}
        className="w-full lg:w-[491px] mx-auto mt-[92.65px] lg:mt-[102.65px]"
      />
      <Button
        type={3}
        className="max-w-[237px] h-[53px] mx-auto mt-[158px] text-[17.4884px] font-medium"
        onClick={handleClick}
        disabled={result2 && !portfolio && !error}
      >
        {result2 && !portfolio && !error ? (
          <>
            {timeoutError ? "Still loading" : "Generating"}
            <ClipLoader color="#1E1E1E" size={20} />
          </>
        ) : (
          "Generate Portfolio"
        )}
      </Button>
      {error && (
        <ErrorBox
          error={error}
          scanning
          reset={handleViewDemoPortfolio}
          className="mt-[20px]"
        />
      )}
      {!error && timeoutError && (
        <div className="mt-[2px] animate-fadeIn">
          <p className="text-red-light text-[11px]">
            It's taking longer than expected
          </p>
          <p className="text-yellow-deep text-[11px] mt-[20px]">
            <a onClick={disconnect} className="underline cursor-pointer">
              Try Different Wallet
            </a>
            <a
              onClick={handleViewDemoPortfolio}
              className="underline cursor-pointer ml-[10px]"
            >
              View Demo Portfolio
              {isLoadingDemo && (
                <ClipLoader size={10} color="#F0B93A" className="ml-[4px]" />
              )}
            </a>
          </p>
          <p className="mt-[20px] text-grey-deep text-[11px]">
            🔎 Sometimes it can take up to 10 minutes to complete a wallet scan
          </p>
        </div>
      )}
    </div>
  );
}
