import WAValidator from "multicoin-address-validator";
import { useEffect, useMemo, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { ReactComponent as AISvg } from "src/assets/img/icons/ai.svg";
import { ReactComponent as ConfirmHexagonSvg } from "src/assets/img/icons/confirm-hexagon.svg";
import { ReactComponent as LockSvg } from "src/assets/img/icons/lock.svg";
import { ReactComponent as LockSvg2 } from "src/assets/img/icons/lock2.svg";
import PoolLinesSvg1 from "src/assets/img/icons/pool-lines-1.svg";
import PoolLinesSvg10 from "src/assets/img/icons/pool-lines-10.svg";
import PoolLinesSvg11 from "src/assets/img/icons/pool-lines-11.svg";
import PoolLinesSvg12 from "src/assets/img/icons/pool-lines-12.svg";
import PoolLinesSvg13 from "src/assets/img/icons/pool-lines-13.svg";
import PoolLinesSvg14 from "src/assets/img/icons/pool-lines-14.svg";
import PoolLinesSvg15 from "src/assets/img/icons/pool-lines-15.svg";
import PoolLinesSvg16 from "src/assets/img/icons/pool-lines-16.svg";
import PoolLinesSvg17 from "src/assets/img/icons/pool-lines-17.svg";
import PoolLinesSvg18 from "src/assets/img/icons/pool-lines-18.svg";
import PoolLinesSvg19 from "src/assets/img/icons/pool-lines-19.svg";
import PoolLinesSvg2 from "src/assets/img/icons/pool-lines-2.svg";
import PoolLinesSvg20 from "src/assets/img/icons/pool-lines-20.svg";
import PoolLinesSvg3 from "src/assets/img/icons/pool-lines-3.svg";
import PoolLinesSvg4 from "src/assets/img/icons/pool-lines-4.svg";
import PoolLinesSvg5 from "src/assets/img/icons/pool-lines-5.svg";
import PoolLinesSvg6 from "src/assets/img/icons/pool-lines-6.svg";
import PoolLinesSvg7 from "src/assets/img/icons/pool-lines-7.svg";
import PoolLinesSvg8 from "src/assets/img/icons/pool-lines-8.svg";
import PoolLinesSvg9 from "src/assets/img/icons/pool-lines-9.svg";
import { ReactComponent as SandGlassSvg } from "src/assets/img/icons/sandglass.svg";
import { ReactComponent as SandGlassSvg2 } from "src/assets/img/icons/sandglass2.svg";
import { ReactComponent as SearchConfirmSvg } from "src/assets/img/icons/searchconfirm.svg";
import { ReactComponent as SearchConfirmSvg2 } from "src/assets/img/icons/searchconfirm2.svg";
import { ReactComponent as SettingSvg } from "src/assets/img/icons/setting.svg";
import { ReactComponent as TwitterSvg } from "src/assets/img/icons/twitter-button.svg";
import { Rate } from "src/components/Rate";
import { Toast } from "src/components/Toast";
import { TooltipContainer } from "src/components/Tooltip";
import { Button } from "src/components/lib";
import { ModalType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";
import { useToast } from "src/contexts/ToastContext";
import { useWallet } from "src/contexts/WalletContext";
import { useGeneratePortfolio } from "src/hooks/useGeneratePortfolio";
import { useTwitterShare } from "src/hooks/useTwitterShare";
import { isMobileDevice, openNewTab } from "src/utils/helpers";
import { DeFiChart } from "../../../../components/charts/DeFiChart";
import { ChainLogo } from "./components/ChainLogo";
import { CustomizePortfolio } from "./components/CustomizePortfolio";
import { HowItWorks } from "./components/HowItWorks";
import { PoolBox } from "../../../../components/PoolBox";
import { RiskLevel } from "./components/RiskLevel";
import { SolanaAddressModal } from "src/components/modals";

const poolRiskMap = { A: 1, B: 2, C: 3, D: 4, F: 5 };

const defaultSettings = {
  portfolioType: "less",
  riskScore: 5,
  diversification: 10,
  selected_chains: [
    {
      value: "all",
      label: "All chains",
    },
  ],
  selected_protocols: [
    {
      value: "all",
      label: "All protocols",
    },
  ],
};

export function Result2({
  analysis: defaultAnalysis,
  isDemo = false,
  viewDemo,
  goBack,
  className,
}) {
  const { showModal, modalType } = useModal();
  const { walletAddress } = useWallet();
  const { showingToast, showToast } = useToast();
  const { isLoading: isSharing, twitterShare } = useTwitterShare();
  const [showingCustomizePortfolio, setShowingCustomizePortfolio] =
    useState(false);
  const [settings, setSettings] = useState({
    ...defaultSettings,
    riskScore: defaultAnalysis.risk_score,
  });
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [isSolanaFarmingModal, setSolanaFarmingModal] = useState(false);

  const customizingRef = useRef();
  const hoveredIndexRef = useRef();

  const {
    portfolio: customizedPortfolio,
    generatePortfolio: generateCustomizedPortfolio,
    isLoading: isGeneratingCustomizedPortfolio,
    error: errorGeneratingCustomizedPortfolio,
  } = useGeneratePortfolio({
    walletAddress: viewDemo ? "" : walletAddress,
    mode: settings.portfolioType,
    riskScore: settings.riskScore,
    diversification: settings.diversification,
    selected_chains: settings.selected_chains,
    selected_protocols: settings.selected_protocols,
    isDemo,
  });

  const analysis = customizedPortfolio
    ? { risk_score: defaultAnalysis.risk_score, ...customizedPortfolio }
    : defaultAnalysis;

  useEffect(() => {
    customizingRef.current = showingCustomizePortfolio;
  }, [showingCustomizePortfolio]);

  useEffect(() => {
    hoveredIndexRef.current = hoveredIndex;
  }, [hoveredIndex]);

  useEffect(() => {

    let timeout;

    if (isMobileDevice()) return;

    if (!customizingRef.current && hoveredIndexRef.current === -1) {
      timeout = setTimeout(() => {
        if (WAValidator.validate(walletAddress, "Solana")) {
          showModal(ModalType.SolanaAddressModal);
        } else {
          showModal(ModalType.JoinModal);
        }
      }, 30000);
    }
    return () => {
      if(timeout) clearTimeout(timeout);
    };
  },[showModal]);



const cellWidth = useMemo(() => [14.5, 13.5, 33.9, 10.9, 8.6], []);

const chartRef = useRef();

const portfolioData = useMemo(() => {
  const result = [];
  analysis.portfolio.forEach((item) => {
    let obj = result.find(
      (e) => e.name === item.protocol_name && e.chain === item.chain_name
    );
    if (!obj) {
      obj = {
        name: item.protocol_name,
        chain: item.chain_name,
        imageId: item.protocol_image_id,
        color: item.protocol_color,
        twitterUsername: item.protocol_twitter_username,
        pools: [],
      };
      result.push(obj);
    }
    obj.pools.push({
      name: item.pool_name.split(" ").slice(1).join(" "),
      yield: item.pool_yield,
      risk: poolRiskMap[item.pool_risk],
      weight: Number(item.portfolio_weight.split("%")[0]),
    });
  });
  let r = result
    .map((item) => ({
      ...item,
      share: item.pools.reduce((s, e) => s + e.weight, 0),
    }))
    .sort((a, b) => b.share - a.share);

  return r;
}, [analysis.portfolio]);

const chartData = useMemo(() => {
  return {
    labels: portfolioData.map((item) => item.chain),
    images: portfolioData.map((item) => {
      const image = new Image();
      image.src = `/images/protocols/Logo-${item.imageId}.png`;
      return image;
    }),
    logoImage: (function () {
      const image = new Image();
      image.src = `/logo192.png`;
      return image;
    })(),
    datasets: [
      {
        label: "# of Interactions",
        data: portfolioData.map((item) => item.share),
        backgroundColor: portfolioData.map((item) => item.color),
        borderColor: portfolioData.map((item) =>
          item.color === "#FFFFFF" ? "#BBBFC3" : "#FFFFFF"
        ),
      },
    ],
  };
}, [portfolioData]);

const topProtocols = useMemo(() => {
  const protocols = [];
  portfolioData.forEach((item) => {
    let obj = protocols.find((e) => e.name === item.name);
    if (!obj) {
      obj = {
        name: item.name,
        twitterUsername: item.twitterUsername,
        share: 0,
      };
      protocols.push(obj);
    }
    obj.share += item.share;
  });
  return protocols.sort((a, b) => b.share - a.share).slice(0, 3);
}, [portfolioData]);

const isSolana = WAValidator.validate(walletAddress, "Solana");
const tweetText = useMemo(
  () =>
    `My @oneclickcrypto DeFi risk score is ${analysis.risk_score
    }/10. My suggested ${isSolana ? "@Solana " : ""}portfolio consists of ${portfolioData.length
    } protocols & ${analysis.portfolio.length} pools ${isSolana
      ? ""
      : `across ${new Set(portfolioData.map((item) => item.chain)).size
      } chains `
    }with ${analysis.avg_yield} average APY. Top-${topProtocols.length
    } protocols are ${topProtocols.length === 1
      ? topProtocols[0].twitterUsername
      : topProtocols
        .slice(0, -1)
        .map((item) => item.twitterUsername)
        .join(", ") +
      ", and " +
      topProtocols[topProtocols.length - 1].twitterUsername
    }, with an average "${analysis.avg_risk}" rating. #1CC${isSolana ? " #Solana" : ""
    }`,
  [
    analysis.avg_risk,
    analysis.avg_yield,
    analysis.portfolio.length,
    analysis.risk_score,
    portfolioData,
    topProtocols,
    isSolana,
  ]
);

const claimText = useMemo(
  () =>
    `This is a theoretical portfolio that doesn’t account for position size or any fees (gas fees, bridging fees, management fees) associated with the listed pools. The APY data is dated ${analysis.pool_data_updated_at}. The APY data doesn’t account for the asset in which payout is made, potential boosts, and requirements for participating in any listed pool. Although we tried our best to develop a system that generates a robust portfolio from a risk-reward perspective, exercise caution and conduct independent research.`,
  [analysis.pool_data_updated_at]
);



const handleTwitterShare = () => {
  twitterShare({
    chartDOM: chartRef.current,
    tweetText,
    portfolioId: analysis.id,
    data: {
      risk_score: analysis.risk_score,
      avg_yield: analysis.avg_yield,
      avg_risk: poolRiskMap[analysis.avg_risk],
      chains: [...new Set(portfolioData.map((item) => item.chain))],
      pool_count: analysis.portfolio.length,
      protocol_count: portfolioData.length,
      live_protocol_percentage: `${Math.round(
        analysis.highlights.live_protocol_percentage * 100
      )}%`,
      audited_protocol_percentage: `${Math.round(
        analysis.highlights.audited_protocol_percentage * 100
      )}%`,
      low_risk_asset_percentage: `${Math.round(
        analysis.highlights.low_risk_asset_percentage * 100
      )}%`,
    },
  });
};

const handleShowJoinModal = () => {
  if (isMobileDevice()) openNewTab("/join");
  else showModal(ModalType.JoinModal);
};

const handleShowCustomizePortfolio = () => {
  setShowingCustomizePortfolio(true);
};

const handleCloseCustomizePortfolio = () => {
  setShowingCustomizePortfolio(false);
};

const handleSaveCustomizePortfolio = () => {
  generateCustomizedPortfolio(() => {
    showToast();
  });
};

const handleHoverElement = (elementIndex) => {
  setHoveredIndex(Math.floor(elementIndex / 2));
};

const handleBlurElement = () => {
  setHoveredIndex(-1);
};

return (
  <>
    {modalType === ModalType.SolanaAddressModal && <SolanaAddressModal />}
    <div
      className={`px-[24px] lg:px-[64px] py-[14px] ${className} animate-fadeIn`}
    >
      <div className="flex flex-col lg:flex-row items-center gap-[16px]">
        <Rate size="small" score={analysis.risk_score} />
        <div>
          <div className="text-center lg:text-left">
            <p className="font-caption font-medium text-[20px] lg:text-[32px] leading-[1.1] text-grey-dark dark:text-grey-lighter8">
              Your Risk Profile
            </p>
            <button
              className="border-none background-none font-body font-bold text-[14px] lg:text-[18px] leading-[1.2] spacing-[-0.5px] text-yellow-dark hover:text-yellow-deep transition-all duration-300"
              onClick={goBack}
            >
              Explore Risk
            </button>
          </div>
        </div>
        <div className="flex lg:ml-auto gap-[18px]">
          <Button type={6} onClick={handleTwitterShare} disabled={isSharing}>
            <TwitterSvg />
            {isSharing ? (
              <>
                Sharing
                <ClipLoader color="white" size={15} />
              </>
            ) : (
              "Share"
            )}
          </Button>
        </div>
      </div>
      <div className="flex flex-col mt-[14px] lg:mt-0 lg:flex-row gap-[32px]">
        <div>
          <div
            className="relative w-[327px] h-[327px] lg:w-[402px] lg:h-[402px] bg-white dark:bg-grey-white5 mx-auto lg:mr-[35.55px] rounded-full transition-all duration-300"
            style={{
              boxShadow: "1.83144px 21.0615px 32.9658px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(6.41002px)",
            }}
          >
            <div
              ref={chartRef}
              className="w-full h-full bg-white dark:bg-grey-white5 rounded-full"
            >
              <DeFiChart
                data={chartData}
                hoveredElementIndex={Math.max(hoveredIndex * 2, -1)}
                onHover={handleHoverElement}
                onBlur={handleBlurElement}
              />
            </div>
          </div>
          <div className="mt-[32px]">
            <p className="font-caption font-medium text-[20px] leading-[1.46] text-grey-dark dark:text-grey-lighter8 text-center lg:text-left">
              Portfolio Highlights
            </p>
            <div className="flex flex-col gap-[16px] mt-[12px]">
              <div
                className="flex items-center px-[14px] py-[12px] bg-white dark:bg-grey-white5 rounded-[8px] transition-all duration-300"
                style={{
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.06)",
                }}
              >
                <SandGlassSvg className="w-[26px] dark:hidden" />
                <SandGlassSvg2 className="w-[26px] hidden dark:block" />
                <p className="font-caption font-medium text-[18px] leading-[1.1] text-grey-black dark:text-white w-[77px] ml-[8px]">
                  {Math.round(
                    analysis.highlights.live_protocol_percentage * 100
                  )}
                  %
                </p>
                <p className="text-[14px] leading-[1.1] text-grey-dark dark:text-white">
                  protocols are live for{" "}
                  <span className="text-yellow-deep">1+ years</span>
                </p>
              </div>
              <div
                className="flex items-center px-[14px] py-[12px] bg-white dark:bg-grey-white5 rounded-[8px] transition-all duration-300"
                style={{
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.06)",
                }}
              >
                <SearchConfirmSvg className="w-[26px] dark:hidden" />
                <SearchConfirmSvg2 className="w-[26px] hidden dark:block" />
                <p className="font-caption font-medium text-[18px] leading-[1.1] text-grey-black dark:text-white w-[77px] ml-[8px]">
                  {Math.round(
                    analysis.highlights.audited_protocol_percentage * 100
                  )}
                  %
                </p>
                <p className="text-[14px] leading-[1.1] text-grey-dark dark:text-white">
                  protocols were audited
                </p>
              </div>
              <div
                className="flex items-center px-[14px] py-[12px] bg-white dark:bg-grey-white5 rounded-[8px] transition-all duration-300"
                style={{
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.06)",
                }}
              >
                <LockSvg className="w-[26px] dark:hidden" />
                <LockSvg2 className="w-[26px] hidden dark:block" />
                <p className="font-caption font-medium text-[18px] leading-[1.1] text-grey-black dark:text-white w-[77px] ml-[8px]">
                  {Math.round(
                    analysis.highlights.low_risk_asset_percentage * 100
                  )}
                  %
                </p>
                <p className="text-[14px] leading-[1.1] text-grey-dark dark:text-white">
                  assets are{" "}
                  <span className="text-yellow-deep">low-risk</span> assets
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="pt-[22.5px] text-center lg:text-left">
            <HowItWorks />
            <div className="flex">
              <p className="font-caption font-medium capitalize text-[32px] leading-[1.1] text-grey-dark dark:text-white">
                Your personalized DeFi portfolio
              </p>
              <Button
                type={15}
                className="hidden ml-auto lg:flex"
                onClick={handleShowCustomizePortfolio}
              >
                <SettingSvg className="w-[17px]" />
                Customize
              </Button>
            </div>
            {/* <p className="text-[14px] font-normal leading-[1.2] tracking-[-0.5px] mt-[12px] lg:mt-[8px] lg:mr-[] text-grey-black dark:text-white child-span:text-yellow-dark">
                Your personalized DeFI Portfolio has{" "}
                <span>{portfolioData.length} protocols</span> &{" "}
                <span>{analysis.portfolio.length} pools</span> across{" "}
                <span>
                  {new Set(portfolioData.map((item) => item.chain)).size} chains
                </span>
                . It delivers <span>{analysis.avg_yield} APY</span> on average.{" "}
                {topProtocols.map((item) => item.name).join(", ")} are among the
                top-{topProtocols.length} of the protocols, and are rated as{" "}
                {analysis.avg_risk} for their security and liquidity.
              </p> */}
            <div
              className="flex gap-[16px] p-[16px] rounded-[8px] bg-white dark:bg-grey-dark transition-all duration-300 mt-[12px]"
              style={{
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div>
                <AISvg
                  style={{
                    filter: "drop-shadow(0px 8px 7px rgba(0, 0, 0, 0.23))",
                  }}
                />
              </div>
              <div
                className="text-black dark:text-white text-[14px] leading-[1.2] tracking-[-0.5px] font-normal text-left"
                dangerouslySetInnerHTML={{
                  __html: analysis.analysis_text,
                }}
              ></div>
            </div>
          </div>
          <div className="hidden lg:flex flex-col flex-grow-[1] bg-white dark:bg-grey-dark rounded-[8px] mt-[8px] transition-all duration-300">
            <div className="flex font-body font-medium text-grey-deep text-[14px] leading-[1.1] px-[16px] py-[8px] border-b-[1px] border-b-grey-light38">
              <div
                style={{
                  width: `${cellWidth[0]}%`,
                }}
              >
                <TooltipContainer tooltipContent="% of the portfolio allocation to a yield protocol">
                  <span className="transition-all duration-300 cursor-default hover:text-grey-darker">
                    Share
                  </span>
                </TooltipContainer>
              </div>
              <div
                style={{
                  width: `${cellWidth[1]}%`,
                }}
              >
                <TooltipContainer tooltipContent="DeFi yield-generating platform">
                  <span className="transition-all duration-300 cursor-default hover:text-grey-darker">
                    Protocol
                  </span>
                </TooltipContainer>
              </div>
              <div
                style={{
                  width: `${cellWidth[2]}%`,
                }}
              >
                <div className="ml-[40%]">
                  <TooltipContainer tooltipContent="Yield-generating pools from a protocol">
                    <span className="transition-all duration-300 cursor-default hover:text-grey-darker">
                      Pool
                    </span>
                  </TooltipContainer>
                </div>
              </div>
              <div
                style={{
                  width: `${cellWidth[3]}%`,
                }}
              >
                <TooltipContainer tooltipContent="Annual yield of a pool, calculated based on the last 30-day average">
                  <span className="transition-all duration-300 cursor-default hover:text-grey-darker">
                    APY
                  </span>
                </TooltipContainer>
              </div>
              <div
                style={{
                  width: `${cellWidth[4]}%`,
                }}
              >
                <TooltipContainer tooltipContent="Risk rating of a pool, 1 — Less Risk, 5 — High Risk">
                  <span className="transition-all duration-300 cursor-default hover:text-grey-darker">
                    Risk
                  </span>
                </TooltipContainer>
              </div>
              <div className="flex-grow-[1]">
                <TooltipContainer tooltipContent="Blockchain on which protocol and pools are located">
                  <span className="transition-all duration-300 cursor-default hover:text-grey-darker">
                    Chain
                  </span>
                </TooltipContainer>
              </div>
            </div>
            <div>
              {portfolioData.map((protocol, i) => (
                <div
                  key={protocol.name + protocol.chain}
                  className={`flex px-[16px] py-[15px] rounded-[8px] transition-all duration-300 ${i === hoveredIndex ? "shadow-lg backdrop-blur-xs" : ""
                    } ${hoveredIndex !== -1 && i !== hoveredIndex
                      ? "opacity-30"
                      : ""
                    }`}
                >
                  <div
                    className="font-normal text-[14px] leading-[1.1] text-grey-black dark:text-grey-lighter8"
                    style={{
                      width: `${cellWidth[0]}%`,
                    }}
                  >
                    {protocol.share.toFixed(2)}%
                  </div>
                  <div
                    className="font-bold text-[14px] leading-[1.1] text-grey-darkest dark:text-white"
                    style={{
                      width: `${cellWidth[1]}%`,
                    }}
                  >
                    {protocol.name}
                  </div>
                  <div
                    className="flex font-normal text-[10px] leading-[1.5] text-grey-black dark:text-grey-lighter8"
                    style={{
                      width: `${cellWidth[2]}%`,
                    }}
                  >
                    <div className="w-[40%] py-[2px] px-[9px]">
                      {protocol.pools.length === 1 && (
                        <div className="flex items-center h-[11px]">
                          <img
                            className="w-full my-auto"
                            src={`${PoolLinesSvg1}#svgView(preserveAspectRatio(none))`}
                            alt="Pool Lines 1"
                          />
                        </div>
                      )}
                      {protocol.pools.length === 2 && (
                        <img
                          className="w-full h-[26px]"
                          src={`${PoolLinesSvg2}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 2"
                        />
                      )}
                      {protocol.pools.length === 3 && (
                        <img
                          className="w-full h-[41px]"
                          src={`${PoolLinesSvg3}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 3"
                        />
                      )}
                      {protocol.pools.length === 4 && (
                        <img
                          className="w-full h-[56px]"
                          src={`${PoolLinesSvg4}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 4"
                        />
                      )}
                      {protocol.pools.length === 5 && (
                        <img
                          className="w-full h-[71px]"
                          src={`${PoolLinesSvg5}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 5"
                        />
                      )}
                      {protocol.pools.length === 6 && (
                        <img
                          className="w-full h-[86px]"
                          src={`${PoolLinesSvg6}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 6"
                        />
                      )}
                      {protocol.pools.length === 7 && (
                        <img
                          className="w-full h-[101px]"
                          src={`${PoolLinesSvg7}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 7"
                        />
                      )}
                      {protocol.pools.length === 8 && (
                        <img
                          className="w-full h-[116px]"
                          src={`${PoolLinesSvg8}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 8"
                        />
                      )}
                      {protocol.pools.length === 9 && (
                        <img
                          className="w-full h-[131px]"
                          src={`${PoolLinesSvg9}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 9"
                        />
                      )}
                      {protocol.pools.length === 10 && (
                        <img
                          className="w-full h-[146px]"
                          src={`${PoolLinesSvg10}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 10"
                        />
                      )}
                      {protocol.pools.length === 11 && (
                        <img
                          className="w-full h-[161px]"
                          src={`${PoolLinesSvg11}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 11"
                        />
                      )}
                      {protocol.pools.length === 12 && (
                        <img
                          className="w-full h-[176px]"
                          src={`${PoolLinesSvg12}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 12"
                        />
                      )}
                      {protocol.pools.length === 13 && (
                        <img
                          className="w-full h-[191px]"
                          src={`${PoolLinesSvg13}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 13"
                        />
                      )}
                      {protocol.pools.length === 14 && (
                        <img
                          className="w-full h-[206px]"
                          src={`${PoolLinesSvg14}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 14"
                        />
                      )}
                      {protocol.pools.length === 15 && (
                        <img
                          className="w-full h-[221px]"
                          src={`${PoolLinesSvg15}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 15"
                        />
                      )}
                      {protocol.pools.length === 16 && (
                        <img
                          className="w-full h-[236px]"
                          src={`${PoolLinesSvg16}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 16"
                        />
                      )}
                      {protocol.pools.length === 17 && (
                        <img
                          className="w-full h-[251px]"
                          src={`${PoolLinesSvg17}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 17"
                        />
                      )}
                      {protocol.pools.length === 18 && (
                        <img
                          className="w-full h-[266px]"
                          src={`${PoolLinesSvg18}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 18"
                        />
                      )}
                      {protocol.pools.length === 19 && (
                        <img
                          className="w-full h-[281px]"
                          src={`${PoolLinesSvg19}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 19"
                        />
                      )}
                      {protocol.pools.length === 20 && (
                        <img
                          className="w-full h-[296px]"
                          src={`${PoolLinesSvg20}#svgView(preserveAspectRatio(none))`}
                          alt="Pool Lines 20"
                        />
                      )}
                    </div>
                    <div className="max-w-[60%] w-[60%] pr-[15px]">
                      {protocol.pools.map((pool, i) => {
                        return (
                          <div
                            className="cursor-default whitespace-nowrap text-ellipsis overflow-clip"
                            title={[pool.name]}
                          >
                            {pool.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div
                    className="font-normal text-[10px] leading-[1.5] text-grey-black dark:text-grey-lighter8"
                    style={{
                      width: `${cellWidth[3]}%`,
                    }}
                  >
                    {protocol.pools.map((pool) => (
                      <div className="w-[34px] text-right">
                        {typeof pool.yield === "undefined"
                          ? "-------"
                          : pool.yield}
                      </div>
                    ))}
                  </div>
                  <div
                    className="font-normal text-[12px] leading-[1.25]"
                    style={{
                      width: `${cellWidth[4]}%`,
                    }}
                  >
                    {protocol.pools.map((pool, index) => (
                      <RiskLevel key={index} value={pool.risk} />
                    ))}
                  </div>
                  <div className="flex text-grey-black dark:text-grey-lighter8 flex-grow-[1]">
                    <div className="flex gap-[8px] items-center h-min">
                      <ChainLogo chain={protocol.chain} /> {protocol.chain}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="hidden lg:flex items-center px-[14px] py-[12px] bg-white dark:bg-grey-dark rounded-[8px] transition-all duration-300"
            style={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div
              className="inline-flex items-center font-caption font-medium text-[18px] leading-[1.46] text-grey-black dark:text-grey-lighter8 child-span:ml-[4px] child-span:text-[14px] child-span:font-bold child-span:leading-[1.1] child-span:text-grey-deep child-span:font-body"
              style={{ width: `${cellWidth[0]}%` }}
            >
              {Math.round(
                portfolioData.reduce((s, item) => s + item.share, 0)
              )}
              %
            </div>
            <div style={{ width: `${cellWidth[1]}%` }}>
              <TooltipContainer tooltipContent="Total number of protocols in a portfolio">
                <div className="inline-flex items-center cursor-default font-caption font-medium text-[18px] leading-[1.46] text-grey-black dark:text-grey-lighter8 child-span:ml-[4px] child-span:text-[14px] child-span:font-bold child-span:leading-[1.1] child-span:text-grey-deep child-span:font-body">
                  {portfolioData.length}
                  <span>Protocols</span>
                </div>
              </TooltipContainer>
            </div>
            <div
              className="flex justify-center"
              style={{ width: `${cellWidth[2]}%` }}
            >
              <TooltipContainer tooltipContent="Total number of pools in a portfolio">
                <div className="inline-flex items-center cursor-default font-caption font-medium text-[18px] leading-[1.46] text-grey-black dark:text-grey-lighter8 child-span:ml-[4px] child-span:text-[14px] child-span:font-bold child-span:leading-[1.1] child-span:text-grey-deep child-span:font-body">
                  {analysis.portfolio.length}
                  <span>Pools</span>
                </div>
              </TooltipContainer>
            </div>
            <div style={{ width: `${cellWidth[3]}%` }}>
              <TooltipContainer tooltipContent="Average portfolio APY">
                <div className="inline-flex items-center cursor-default font-caption font-medium text-[18px] leading-[1.46] text-grey-black dark:text-grey-lighter8">
                  {analysis.avg_yield}
                </div>
              </TooltipContainer>
            </div>
            <div style={{ width: `${cellWidth[4]}%` }}>
              <TooltipContainer
                tooltipContent="Average portfolio risk rating"
                tooltipClassName="!right-[-30px]"
              >
                <div className="inline-flex items-center cursor-default font-caption font-medium text-[18px] leading-[1.46] text-grey-black dark:text-grey-lighter8">
                  <RiskLevel
                    value={poolRiskMap[analysis.avg_risk]}
                    className="text-grey-black"
                  />
                </div>
              </TooltipContainer>
            </div>
            <div>
              <TooltipContainer tooltipContent="Total number of chains this portfolio includes">
                <div className="flex flex-grow-[1] items-center cursor-default font-caption font-medium text-[18px] leading-[1.46] text-grey-black dark:text-grey-lighter8 child-span:ml-[4px] child-span:text-[14px] child-span:font-bold child-span:leading-[1.1] child-span:text-grey-deep child-span:font-body">
                  {new Set(portfolioData.map((item) => item.chain)).size}
                  <span>Chains</span>
                </div>
              </TooltipContainer>
            </div>
          </div>
          <div className="hidden lg:flex items-center mt-[18px]">
            <p className="ml-auto font-normal text-[12px] leading-[1.25] italic text-grey-darker2 dark:text-grey-deep">
              {claimText}
            </p>
            <Button
              type={7}
              className="ml-[14px] hidden lg:flex"
              onClick={handleShowJoinModal}
            >
              Farm all with One Click
            </Button>
          </div>
        </div>
      </div>
      <h3 className="text-[32px] leading-[1.1] text-grey-dark dark:text-grey-lighter8 mt-[24px] lg:mt-[28px] text-center lg:text-left">
        List of Pools
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-[20px] gap-y-[20px] lg:gap-y-[64px] mt-[24px] lg:mt-[48px]">
        {analysis.portfolio.map((item, index) => (
          <PoolBox
            key={index}
            share={Number(item.portfolio_weight.split("%")[0])}
            risk={poolRiskMap[item.pool_risk]}
            apy={item.pool_yield}
            pool={item.pool_name.split(" ").slice(1).join(" ")}
            protocol={item.protocol_name}
            chain={item.chain_name}
            url={item.pool_url}
            color={item.protocol_color}
            assetImageIds={item.asset_image_ids}
            protocolImageId={item.protocol_image_id}
          />
        ))}
      </div>
      <div className="flex flex-col px-[28px] py-[17px] lg:flex-row justify-center lg:items-center mx-auto mt-[48px] gap-[20px] bg-yellow-dark hover:bg-yellow-deep rounded-[24px] border-[2px] border-yellow-light dark:border-yellow-deep text-[20px] leading-[1.46] font-caption lg:w-[607px] lg:h-[76px] transition-all duration-300">
        Create this portfolio with One Click
        <Button type={12} onClick={handleShowJoinModal}>
          Start
        </Button>
      </div>
      <p className="lg:hidden mt-[20px] font-normal italic text-[12px] leading-1.25] text-grey-darker2">
        {claimText}
      </p>
    </div>
    <CustomizePortfolio
      show={showingCustomizePortfolio}
      handleClose={handleCloseCustomizePortfolio}
      handleSave={handleSaveCustomizePortfolio}
      isLoading={isGeneratingCustomizedPortfolio}
      error={errorGeneratingCustomizedPortfolio}
      settings={settings}
      setSettings={setSettings}
    />
    {customizedPortfolio && showingToast && (
      <Toast
        title="New portfolio generated"
        description="We created a new portfolio based on updated settings"
        IconSvg={ConfirmHexagonSvg}
        className="fixed top-[96px] right-[64px]"
      />
    )}
  </>
);
}
