import { useParams } from "react-router-dom";
import { ReactComponent as TrophyIcon } from "src/assets/img/icons/Trophy.svg";
import { ReactComponent as FeeIcon } from "src/assets/img/icons/fee.svg";
import { AssetGroup } from "src/components/AssetGroup";
import { PoolBox2 } from "src/components/PoolBox2";
import { RiskScoreChart } from "src/components/charts/RiskScoreChart";
import { YieldChart } from "src/components/charts/YieldChart";
import { usePoolData } from "src/hooks/usePoolData";
import { Footer } from "src/layout/Footer";
import { Header } from "src/layout/Header";
import { ChainLogo } from "../Home/sections/Result2/components/ChainLogo";
import { PoolChart } from "src/components/charts/PoolChart";
import { formatInTimeZone } from "date-fns-tz";
import { useMemo } from "react";

const similarPools = [
  {
    asset_image_ids: ["87", "108"],
    asset_symbols: "ETH,ARB",
    chain_name: "Arbitrum",
    pool_name: "Uniswap ARB-ETH Market Making 5bp",
    pool_risk_score: 7.5,
    pool_url:
      "https://info.uniswap.org/#/arbitrum/pools/0xc6f780497a95e246eb9449f5e4770916dcd6396a",
    pool_yield: 12.04,
    pool_tvl: 234612.01,
    portfolio_weight: "14.17%",
    protocol_audited: true,
    protocol_color: "#FEE3EF",
    protocol_image_id: "1",
    protocol_live_for_a_year: true,
    protocol_name: "Uniswap v3",
    protocol_twitter_username: "@Uniswap",
    scaled_ratio: 7.204094914613995,
    _id: "65089f1dbc622d49b2e75ea5",
  },
  {
    asset_image_ids: ["87", "108"],
    asset_symbols: "ETH,ARB",
    chain_name: "Arbitrum",
    pool_name: "Uniswap ARB-ETH Market Making 30bp",
    pool_risk_score: 3.2,
    pool_url:
      "https://info.uniswap.org/#/arbitrum/pools/0x92c63d0e701caae670c9415d91c474f686298f00",
    pool_yield: 11.52,
    pool_tvl: 234612.01,
    portfolio_weight: "14.08%",
    protocol_audited: true,
    protocol_color: "#FEE3EF",
    protocol_image_id: "1",
    protocol_live_for_a_year: true,
    protocol_name: "Uniswap v3",
    protocol_twitter_username: "@Uniswap",
    scaled_ratio: 7.15578932227651,
    _id: "65089f1dbc622d49b2e75ea6",
  },
  {
    asset_image_ids: ["15", "35"],
    asset_symbols: "USDC,WETH",
    chain_name: "Arbitrum",
    pool_name: "Uniswap ETH-USD Market Making 5bp",
    pool_risk_score: 4,
    pool_url:
      "https://info.uniswap.org/#/arbitrum/pools/0x7e5e4a3f855f19cc1a45b9eff1c8b2419036ce85",
    pool_yield: 19.54,
    pool_tvl: 234612.01,
    portfolio_weight: "13.97%",
    protocol_audited: true,
    protocol_color: "#FEE3EF",
    protocol_image_id: "1",
    protocol_live_for_a_year: true,
    protocol_name: "Uniswap v3",
    protocol_twitter_username: "@Uniswap",
    scaled_ratio: 7.102116441901529,
    _id: "65089f1dbc622d49b2e75ea7",
  },
  {
    asset_image_ids: ["56", "15"],
    asset_symbols: "AAVE,USDC",
    chain_name: "Polygon",
    pool_name: "Uniswap AAVE-USD Market Making 30bp",
    pool_risk_score: 10,
    pool_url:
      "https://info.uniswap.org/#/polygon/pools/0xa236278bec0e0677a48527340cfb567b4e6e9adc",
    pool_yield: 30.6,
    pool_tvl: 234612.01,
    portfolio_weight: "9.78%",
    protocol_audited: true,
    protocol_color: "#FEE3EF",
    protocol_image_id: "1",
    protocol_live_for_a_year: true,
    protocol_name: "Uniswap v3",
    protocol_twitter_username: "@Uniswap",
    scaled_ratio: 4.973624080436386,
    _id: "65089f1dbc622d49b2e75ea8",
  },
  {
    asset_image_ids: ["50", "15"],
    asset_symbols: "GMX,USDC",
    chain_name: "Arbitrum",
    pool_name: "Uniswap GMX-USD Market Making",
    pool_risk_score: 5,
    pool_url:
      "https://info.uniswap.org/#/arbitrum/pools/0xbed2589fefae17d62a8a4fdac92fa5895cae90d2",
    pool_yield: 21.37,
    pool_tvl: 234612.01,
    portfolio_weight: "9.42%",
    protocol_audited: true,
    protocol_color: "#FEE3EF",
    protocol_image_id: "1",
    protocol_live_for_a_year: true,
    protocol_name: "Uniswap v3",
    protocol_twitter_username: "@Uniswap",
    scaled_ratio: 4.789540606934086,
    _id: "65089f1dbc622d49b2e75ea9",
  },
  {
    asset_image_ids: ["15", "58"],
    asset_symbols: "USDC,agEUR",
    chain_name: "Polygon",
    pool_name: "Uniswap EUR-USD Market Making",
    pool_risk_score: 6.5,
    pool_url:
      "https://beta.arrakis.finance/vaults/0xEDECB43233549c51CC3268b5dE840239787AD56c",
    pool_yield: 21.04,
    pool_tvl: 234612.01,
    portfolio_weight: "9.40%",
    protocol_audited: true,
    protocol_color: "#FEE3EF",
    protocol_image_id: "1",
    protocol_live_for_a_year: true,
    protocol_name: "Uniswap v3",
    protocol_twitter_username: "@Uniswap",
    scaled_ratio: 4.777268375367266,
    _id: "65089f1dbc622d49b2e75eaa",
  },
  {
    asset_image_ids: ["56", "87"],
    asset_symbols: "AAVE,WETH",
    chain_name: "Polygon",
    pool_name: "Uniswap AAVE-ETH Market Making 30bp",
    pool_risk_score: 7,
    pool_url:
      "https://info.uniswap.org/#/polygon/pools/0x2aceda63b5e958c45bd27d916ba701bc1dc08f7a",
    pool_yield: 41.07,
    pool_tvl: 234612.01,
    portfolio_weight: "8.89%",
    protocol_audited: true,
    protocol_color: "#FEE3EF",
    protocol_image_id: "1",
    protocol_live_for_a_year: true,
    protocol_name: "Uniswap v3",
    protocol_twitter_username: "@Uniswap",
    scaled_ratio: 4.5196107986068785,
    _id: "65089f1dbc622d49b2e75eab",
  },
  {
    asset_image_ids: ["67"],
    asset_symbols: "CRV",
    chain_name: "Ethereum",
    pool_name: "Convex CRV Fee Sharing",
    pool_risk_score: 2,
    pool_url: "https://www.convexfinance.com/stake",
    pool_yield: 12.19,
    pool_tvl: 234612.01,
    portfolio_weight: "7.25%",
    protocol_audited: true,
    protocol_color: "#3A3A3A",
    protocol_image_id: "41",
    protocol_live_for_a_year: true,
    protocol_name: "Convex",
    protocol_twitter_username: "@ConvexFinance",
    scaled_ratio: 3.684418728899296,
    _id: "65089f1dbc622d49b2e75eac",
  },
];

export function PoolPage() {
  const detailedView = true;

  let { poolId } = useParams();
  const { data } = usePoolData({ poolId });

  const liquidityShares = useMemo(() => {
    const colors = ["#D0D0D099", "#FF007A33", "#00A3FF33"];
    const value = data.poolData.asset_image_ids.map((item, index) => ({
      imageId: item,
      color: colors[index],
      share: 100 / data.poolData.asset_image_ids.length,
    }));
    return value;
  }, [data.poolData.asset_image_ids]);

  return (
    <>
      <div className="flex flex-col h-full">
        {true ? (
          <>
            <Header />
            <div className="px-[24px] lg:px-[64px] mt-[16px] lg:mt-[34px] animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[23px]">
                  <AssetGroup imageIds={data.poolData.asset_image_ids} />
                  <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px] leading-[15px] font-normal text-grey-deep">
                      {/* Last updated: May 31 2023, 15:55:30 */}
                      Last updated:{" "}
                      {`${formatInTimeZone(
                        data.poolData.last_updated_at,
                        "UTC",
                        "MMM dd yyyy,"
                      )} 00:00:00 UTC`}
                    </p>
                    <h3 className="text-[32px] leading-[1.1] text-grey-dark">
                      {data.poolData.pool_name}
                    </h3>
                    <div className="flex items-center gap-[16px]">
                      <div className="flex items-center gap-[10px]">
                        <p className="text-[16px] leading-[1.2] tracking-[-0.5px] font-normal text-grey-deep">
                          Protocol:
                        </p>
                        <div className="flex items-center gap-[8px]">
                          <div
                            className="w-[24px] h-[24px] rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: "#FEE3EF",
                            }}
                          >
                            <img
                              src={`/images/protocols/Logo-${data.poolData.protocol_image_id}.png`}
                              className="w-[80%] h-[80%]"
                              alt="Pool"
                            />
                          </div>
                          <p className="text-[16px] leading-[1.1] text-grey-black">
                            {data.poolData.protocol_name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-[10px]">
                        <p className="text-[16px] leading-[1.2] tracking-[-0.5px] font-normal text-grey-deep">
                          Chain:
                        </p>
                        <div className="flex items-center gap-[8px]">
                          <ChainLogo chain={data.poolData.chain_name} />
                          <p className="text-[16px] leading-[1.1] text-grey-black">
                            {data.poolData.chain_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="flex gap-[8px]">
                    <div className="flex items-center gap-[4px] px-[8px] py-[4px] rounded-[4px] bg-grey-lighter9">
                      <p className="font-normal text-[14px] leading-[1.1] text-grey-deep">
                        DEX
                      </p>
                    </div>
                    <div className="flex items-center gap-[4px] px-[8px] py-[4px] rounded-[4px] bg-grey-lighter9">
                      <p className="font-normal text-[14px] leading-[1.1] text-grey-deep">
                        Top-5 TVL
                      </p>
                      <TrophyIcon />
                    </div>
                  </div>
                  <div className="flex gap-[16px]">
                    <div className="flex flex-col">
                      <p className="font-normal text-[14px] leading-[1.1] text-grey-deep">
                        Total Value Locked
                      </p>
                      <p className="font-caption text-[16px] leading-[1.46] text-grey-dark">
                        ${Number(data.poolInfo.tvlUsd).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-normal text-[14px] leading-[1.1] text-grey-deep">
                        Pool Active For
                      </p>
                      <p className="font-caption text-[16px] leading-[1.46] text-grey-dark">
                        587 days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`flex ${
                  detailedView ? "gap-[117px]" : "gap-[26px]"
                } justify-center items-center mt-[72px] mx-auto`}
              >
                <div className="flex flex-col gap-[12px]">
                  <h4 className="text-[32px] leading-[1.1] text-grey-dark ml-[12px]">
                    Risk Score
                  </h4>
                  <div className="flex items-center gap-[25px]">
                    <RiskScoreChart
                      score={7.5}
                      label={detailedView ? "Average Score" : ""}
                      className="w-[213.79px] h-[213.79px] bg-red-500"
                      style={{
                        boxShadow:
                          "1.83144px 21.0615px 32.9658px rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(6.41002px)",
                      }}
                    />
                    {detailedView && (
                      <div className="w-[297px] mt-[-20px]">
                        <p className="font-bold text-[16px] leading-[1.2] tracking-[-0.5px] text-grey-dark">
                          Rated by
                        </p>
                        <div className="flex flex-col gap-[8px] mt-[8px]">
                          <div className="flex items-center rounded-[8px] p-[4px] bg-grey-lightest-20">
                            <img
                              src="/images/indexers/Logo-0.png"
                              alt="Indexer"
                              className="w-[28px] h-[28px] object-cover"
                            />
                            <p className="ml-[6px] text-[14px] leading-[1.46] text-grey-dark">
                              Exponential
                            </p>
                            <RiskScoreChart
                              bgNone
                              score={7.5}
                              small
                              scoreClassName="!text-[11.6px]"
                              className="w-[31px] h-[31px] ml-auto"
                            />
                          </div>
                          <div className="flex items-center rounded-[8px] p-[4px] bg-grey-lightest-20">
                            <img
                              src="/images/indexers/Logo-1.png"
                              alt="Indexer"
                              className="w-[28px] h-[28px] object-cover"
                            />
                            <p className="ml-[6px] text-[14px] leading-[1.46] text-grey-dark">
                              Exponential
                            </p>
                            <RiskScoreChart
                              bgNone
                              score={5.3}
                              small
                              scoreClassName="!text-[11.6px]"
                              className="w-[31px] h-[31px] ml-auto"
                            />
                          </div>
                          <div className="flex items-center rounded-[8px] p-[4px] bg-grey-lightest-20">
                            <img
                              src="/images/indexers/Logo-2.png"
                              alt="Indexer"
                              className="w-[28px] h-[28px] object-cover"
                            />
                            <p className="ml-[6px] text-[14px] leading-[1.46] text-grey-dark">
                              Exponential
                            </p>
                            <RiskScoreChart
                              bgNone
                              score={3.2}
                              small
                              scoreClassName="!text-[11.6px]"
                              className="w-[31px] h-[31px] ml-auto"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <h4 className="text-[32px] leading-[1.1] text-grey-dark ml-[62px]">
                    Yield
                  </h4>
                  <div className="flex items-center gap-[25px]">
                    <YieldChart
                      apy={data.poolInfo.apy}
                      base={data.poolInfo.apyBase}
                      boost={data.poolInfo.apyReward}
                      liquidityShares={liquidityShares}
                    />
                    {detailedView && (
                      <div className="mt-[-20px]">
                        <p className="font-bold text-[16px] leading-[1.46] text-grey-dark">
                          Fees
                        </p>
                        <div className="flex items-center gap-[4px] mt-[4px]">
                          <FeeIcon className="mt-[4px]" />
                          <div>
                            <p className="font-normal text-[12px] leading-[1.25] text-grey-deep">
                              Gas Fee
                            </p>
                            <p className="font-caption text-[14px] leading-[1.46] text-grey-dark">
                              {data.poolInfo.poolMeta &&
                                data.poolInfo.poolMeta[
                                  data.poolInfo.poolMeta.length - 1
                                ] === "%" &&
                                data.poolInfo.poolMeta}
                            </p>
                            {/* <p className="font-caption text-[14px] leading-[1.46] text-grey-dark">
                              0.0041 ETH{" "}
                              <span className="font-body font-normal text-[12px] leading-[1.25] text-grey-deep">
                                ($8.13)
                              </span>
                            </p> */}
                          </div>
                        </div>
                        <p className="font-bold text-[16px] leading-[1.46] text-grey-dark mt-[26px]">
                          Potential Airdrops
                        </p>
                        <div className="flex gap-[4px] mt-[8px]">
                          <img
                            src={`/images/assets/Logo-1.png`}
                            alt="Asset"
                            className="w-[18px] h-[18px] rounded-full"
                          />
                          <img
                            src={`/images/assets/Logo-2.png`}
                            alt="Asset"
                            className="w-[18px] h-[18px] rounded-full"
                          />
                          <img
                            src={`/images/assets/Logo-3.png`}
                            alt="Asset"
                            className="w-[18px] h-[18px] rounded-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {detailedView && (
                <PoolChart
                  poolData={data.poolData}
                  poolInfo={data.poolInfo}
                  className={"mt-[158px]"}
                />
              )}
              <p className="text-[32px] leading-[1.1] font-caption text-grey-dark mt-[160px]">
                Similar Pools
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-[20px] gap-y-[20px] lg:gap-y-[48px] mt-[24px] lg:mt-[48px]">
                {similarPools.map((item, index) => (
                  <PoolBox2
                    key={index}
                    // share={Number(item.portfolio_weight.split("%")[0])}
                    // risk={poolRiskMap[item.pool_risk]}
                    // apy={item.pool_yield}
                    // pool_tvl: 234612.01,
                    // pool={item.pool_name.split(" ").slice(1).join(" ")}
                    // protocol={item.protocol_name}
                    // chain={item.chain_name}
                    // url={item.pool_url}
                    // color={item.protocol_color}
                    // assetImageIds={item.asset_image_ids}
                    // protocolImageId={item.protocol_image_id}
                    pool={item.pool_name.split(" ").slice(1).join(" ")}
                    riskScore={item.pool_risk_score}
                    apy={item.pool_yield}
                    tvl={item.pool_tvl}
                    protocol={item.protocol_name}
                    chain={item.chain_name}
                    url={item.pool_url}
                    assetImageIds={item.asset_image_ids}
                    protocolImageId={item.protocol_image_id}
                    color={item.protocol_color}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>Loading ...</div>
        )}
        <div className="mt-auto pt-[72px]">
          <Footer />
        </div>
      </div>
    </>
  );
}
