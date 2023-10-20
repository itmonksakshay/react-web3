import { useState } from "react";

const poolData = {
  pool_name: "Aave USD Lending",
  pool_risk: "B",
  pool_yield: 0.0347,
  chain_name: "Optimism",
  protocol_name: "Aave V3",
  pool_url:
    "https://app.aave.com/reserve-overview/?underlyingAsset=0x7f5c764cbc14f9669b88837ca1490cca17c31607&marketName=proto_optimism_v3",
  asset_names: "USD Coin (Optimism)",
  asset_symbols: "USDC",
  asset_image_ids: ['15'],
  protocol_image_id: "13",
  last_updated_at: "2023-09-22T20:59:00.000Z",
};

const poolInfo = {
  chain: "Optimism",
  project: "aave-v3",
  symbol: "WSTETH",
  tvlUsd: 29941475,
  apyBase: 0.03325,
  apyReward: null,
  apy: 0.03325,
  rewardTokens: null,
  pool: "03a0cf78-c2f0-4ce5-85a8-2d5b77349276",
  apyPct1D: 0.00025,
  apyPct7D: 0.0096,
  apyPct30D: 0.02933,
  stablecoin: false,
  ilRisk: "no",
  exposure: "single",
  predictions: {
    predictedClass: "Stable/Up",
    predictedProbability: 57.99999999999999,
    binnedConfidence: 1,
  },
  poolMeta: null,
  mu: 0.03063,
  sigma: 0.00284,
  count: 213,
  outlier: false,
  underlyingTokens: ["0x1f32b1c2345538c0c6f582fcb022739c4a194ebb"],
  il7d: null,
  apyBase7d: null,
  apyMean30d: 0.01567,
  volumeUsd1d: null,
  volumeUsd7d: null,
  apyBaseInception: null,
};

export function usePoolData({ poolId }) {
  const [data, setData] = useState({ poolInfo, poolData });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return {
    data,
    isLoading,
    error,
  };
}
