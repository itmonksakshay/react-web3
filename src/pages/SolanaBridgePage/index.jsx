import WAValidator from "multicoin-address-validator";
import * as Loader from "react-spinners";
import { Button } from "src/components/lib";
import { ConnectModal, DisconnectModal } from "src/components/modals";
import { ModalType, SwapStatus } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";
import { Footer } from "src/layout/Footer";
import { Header } from "src/layout/Header";
import { HexagonTickIcon } from "../../components/icons/HexagonTickIcon";
import ApproveTransaction from "./components/ApproveTransaction";
import { Toast } from "src/components/Toast";

import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as CloseSvg } from "src/assets/img/icons/close.svg";
import { ReactComponent as ConnectSvg } from "src/assets/img/icons/connect.svg";
import { ReactComponent as ConnectedSvg } from "src/assets/img/icons/connected.svg";
import { ReactComponent as ConnectedSvg2 } from "src/assets/img/icons/connected2.svg";
import { ReactComponent as ErrorHexagonSvg } from "src/assets/img/icons/hexagon-error.svg";
import { ReactComponent as ConfirmHexagonSvg } from "src/assets/img/icons/confirm-hexagon.svg";
import { ReactComponent as InfoSvg } from "src/assets/img/icons/info.svg";
import { ReactComponent as SwitchVerticalIcon } from "src/assets/img/icons/switch-vertical.svg";
import { ReactComponent as WalletGreyIcon } from "src/assets/img/icons/wallet-grey.svg";
import { useWallet } from "src/contexts/WalletContext";
import useNetworkSelector from "src/hooks/useNetworkSelector";
import { useApproveTransaction } from "src/hooks/useApproveTransaction";
import { useQuote } from "src/hooks/useQuote";
import { useSwapStatus } from "src/hooks/useSwapStatus";
import { formatAddress, getTxnLink } from "src/utils/helpers";
import { useDebounce } from "use-debounce";
import { AmountInput } from "./components/AmountInput";
import { AssetWithChain } from "./components/AssetWithChain";
import { ErrorBox } from "./components/ErrorBox";
import { TokenSelectControl } from "./components/TokenSelectControl";
import { TokenSelectModal } from "./components/TokenSelectModal";
import { TooltipContainer } from "src/components/Tooltip";
import { useToast } from "src/contexts/ToastContext";

const infoList = {
  transferFee: {
    label: "Transfer Fee",
    value: "0.000075 ETH",
    tooltip:
      "Transferring funds between wallets, especially across different blockchains, incurs a fee. This fee varies based on network conditions and specific blockchain factors. Check and confirm fees before transferring",
  },
  gasFee: {
    label: "Gas Fee",
    value: "$0",
    tooltip: "Gas Fee: A fee you pay for blockchain transaction processing.",
  },
  estimateTime: {
    label: "Estimated Time",
    value: "18 min",
    tooltip:
      "Time given is a rough estimate and may vary based on individual pace.",
  }
}

const fromTokenData = [
  // Ethereum
  {
    chainName: "Ethereum",
    chainSymbol: "ETH",
    chainId: 1,
    chainImageName: "Ethereum",
    tokens: [
      {
        tokenSymbol: "USDT",
        tokenAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        tokenImageId: "27",
        decimals: 6,
      },
      {
        tokenSymbol: "USDC",
        tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        tokenImageId: "15",
        decimals: 6,
      },
      {
        tokenSymbol: "ETH",
        tokenImageId: "87",
        decimals: 18,
        isNative: true,
      },
    ],
  },
  // BNB Chain
  // {
  //   chainName: "BNB",
  //   chainSymbol: "BSC",
  //   chainId: 56,
  //   chainImageName: "BNB Chain",
  //   tokens: [
  //     {
  //       tokenSymbol: "USDT",
  //       tokenAddress: "0x55d398326f99059fF775485246999027B3197955",
  //       tokenImageId: "27",
  //       decimals: 18,
  //     },
  //     {
  //       tokenSymbol: "USDC",
  //       tokenAddress: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  //       tokenImageId: "15",
  //       decimals: 18,
  //     },
  //   ],
  // },
  // Polygon
  {
    chainName: "Polygon",
    chainSymbol: "POL",
    chainId: 137,
    chainImageName: "Polygon",
    tokens: [
      {
        tokenSymbol: "USDT",
        tokenAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        tokenImageId: "27",
        decimals: 6,
      },
      {
        tokenSymbol: "USDC",
        tokenAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        tokenImageId: "15",
        decimals: 6,
      },
    ],
  },
  // Arbitrum
  // {
  //   chainName: "Arbitrum",
  //   chainSymbol: "ARB",
  //   chainId: 42161,
  //   chainImageName: "Arbitrum",
  //   tokens: [
  //     {
  //       tokenSymbol: "USDT",
  //       tokenAddress: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  //       tokenImageId: "27",
  //       decimals: 6,
  //     },
  //     {
  //       tokenSymbol: "USDC",
  //       tokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  //       tokenImageId: "15",
  //       decimals: 6,
  //     },
  //   ],
  // },
  // Optimism
  // {
  //   chainName: "Optimism",
  //   chainSymbol: "OPT",
  //   chainId: 300,
  //   chainImageName: "Optimism",
  //   tokens: [
  //     {
  //       tokenSymbol: "USDT",
  //       tokenAddress: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
  //       tokenImageId: "27",
  //       decimals: 6,
  //     },
  //     {
  //       tokenSymbol: "USDC",
  //       tokenAddress: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  //       tokenImageId: "15",
  //       decimals: 6,
  //     },
  //   ],
  // },
  // Avalanche
  // {
  //   chainName: "Avalanche",
  //   chainSymbol: "AVA",
  //   chainId: 43114,
  //   chainImageName: "Avalanche",
  //   tokens: [
  //     {
  //       tokenSymbol: "USDT",
  //       tokenAddress: "0xffd50AF15e52e6cF177f5888Dd32966C405A8eCC",
  //       tokenImageId: "27",
  //       decimals: 18,
  //     },
  //     {
  //       tokenSymbol: "USDC",
  //       tokenAddress: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  //       tokenImageId: "15",
  //       decimals: 6,
  //     },
  //   ],
  // },
];

const toTokenData = [
  {
    chainName: "Solana",
    chainSymbol: "SOL",
    chainImageName: "Solana",
    tokens: [
      {
        tokenSymbol: "USDT",
        tokenAddress: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        tokenImageId: "27",
        decimals: 6,
      },
      {
        tokenSymbol: "USDC",
        tokenAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        tokenImageId: "15",
        decimals: 6,
      },
      {
        tokenSymbol: "SOL",
        tokenImageId: "43",
        decimals: 9,
        isNative: false,
      },
    ],
  },
];

export function SolanaBridgePage() {
  const { walletAddress, disconnect, provider } = useWallet();
  const { showModal, modalType, closeModal } = useModal();

  const [fromAmount, setFromAmount] = useState("");
  const [showingFromTokenSelectModal, setShowingFromTokenSelectModal] =
    useState(false);
  const [showingToTokenSelectModal, setShowingToTokenSelectModal] =
    useState(false);
  const [showingToAddressInput, setShowingToAddressInput] = useState(false);
  const [fromChainIndex, setFromChainIndex] = useState(0);
  const [fromTokenIndex, setFromTokenIndex] = useState(1);
  const [toChainIndex, setToChainIndex] = useState(0);
  const [toTokenIndex, setToTokenIndex] = useState(1);
  const [toAddress, setToAddress] = useState("");
  const [solanaAddressError, setSolanaAddressError] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState({ txHash: "", error: false, status: false })
  const [isTransactionReset,resetTransaction] = useState(false);

  const [debouncedFromAmount] = useDebounce(fromAmount, 500);

  const toAddressInputRef = useRef(null);

  const { showingToast, showToast } = useToast();
  const [toastMessage, setToastMessage] = useState({ title: "", subTitle: "", status: false, icon: "" })

  const [quoteInfo, setQuoteInfo] = useState(infoList);

  const {
    data: quote,
    run: fetchQuote,
    loading: isFetchingQuote,
    error: errorQuote,
    reset: resetQuote,
  } = useQuote();

  const {
    success: txnSuccess,
    resetError,
    error: transactionError,
    setTransactionApproveError,
    fromChainTxnHash,
  } = useApproveTransaction();

  const { getNetworkId, setWalletNetwork, networkChanged, networkChangeError } = useNetworkSelector();

  const {
    status: swapStatus,
    substatus: swapSubstatus,
    resetStatus: resetSwapStatus,
    getransactionStatus
  } = useSwapStatus();

  const showConnectModal = () => showModal(ModalType.ConnectModal);
  const handleDisconnect = () => {
    disconnect();
    closeModal();
  };
  const handleFromTokenSelect = async (chainIndex, tokenIndex) => {

    const networkId = await getNetworkId();
    if (networkId !== fromTokenData[chainIndex].chainId) {
      const status = await setWalletNetwork(fromTokenData[chainIndex].chainId);
      if (status) {
        setFromChainIndex(chainIndex);
        setFromTokenIndex(tokenIndex);
        setShowingFromTokenSelectModal(false);
      } else {
        setToastMessage({ title: "Network Change Request", subTitle: "Denied", icon: "network", status: true });
      }
    } else {
      setFromChainIndex(chainIndex);
      setFromTokenIndex(tokenIndex);
      setShowingFromTokenSelectModal(false);
    }
  };

  const handleToTokenSelect = (chainIndex, tokenIndex) => {
    setToChainIndex(chainIndex);
    setToTokenIndex(tokenIndex);
    setShowingToTokenSelectModal(false);
  };
  const handlePasteAddress = async () => {
    // const text = await navigator.clipboard.readText();
    // if (!WAValidator.validate(text, "Solana")) setSolanaAddressError(true);
    // else {
    //   setSolanaAddressError(false);
    //   setToAddress(text.slice(0, 44));
    // }
    setShowingToAddressInput(true);
    setTimeout(() => {
      toAddressInputRef.current?.focus();
    }, 0);
  };


  const handleResetSwap = () => {
    resetQuote();
    resetError("");
    setTransactionApproveError("");
    setFromChainIndex(0);
    setFromTokenIndex(1);
  };

  useEffect(() => {
    if (toastMessage.status) {
      showToast();
      setToastMessage((value) => ({ ...value, status: false }))
    }
  }, [toastMessage])

  useEffect(() => {

    if (transactionStatus.status) {
      setToastMessage({ title: "Transaction Confirmed", subTitle: "status: Pending", icon: "transaction", status: true });
    }
  }, [transactionStatus])

  useEffect(() => {

    if (transactionStatus.status && transactionStatus.txHash.length) {
      getransactionStatus(transactionStatus.txHash);
    }
  }, [transactionStatus,swapStatus])

  useEffect(() => {
    if (swapStatus.status === SwapStatus.DONE || networkChangeError){

      handleResetSwap();
      resetTransaction(true);
    } 
  }, [swapStatus, networkChangeError])

  useEffect(() => {

    if (quote) {
      const gasCost = quote?.estimate?.gasCosts[0]?.amountUSD || 0;
      const amount = ethers.BigNumber.from(quote?.estimate?.gasCosts[0]?.amount);
      const coinSymbol = quote?.estimate?.gasCosts[0]?.token?.symbol || 'ETH'

      const transferFee = ethers.utils.formatUnits(amount, quote?.estimate?.gasCosts[0]?.token?.decimals || 18);
      const estimateTime = Number(quote?.estimate?.executionDuration || 1) / 60;

      setQuoteInfo((value) => ({
        ...value,
        gasFee: { ...value.gasFee, value: `$${gasCost}` },
        transferFee: { ...value.transferFee, value: `${transferFee.substring(0, 8)} ${coinSymbol}` },
        estimateTime: { ...value.estimateTime, value: `${Math.floor(estimateTime)} mins` }
      }))
    }

  }, [quote])



  useEffect(() => {
    if (!walletAddress) return;
    closeModal();
  }, [closeModal, walletAddress]);

  useEffect(() => {
    if (!WAValidator.validate(toAddress, "Solana")) {
      resetQuote();
      setSolanaAddressError(true);
      return;
    } else setSolanaAddressError(false);
    resetQuote();
    fetchQuote({
      fromAmount: debouncedFromAmount,
      fromChain: fromTokenData[fromChainIndex].chainSymbol,
      fromToken: fromTokenData[fromChainIndex].tokens[fromTokenIndex],
      fromAddress: walletAddress,
      toChain: toTokenData[toChainIndex].chainSymbol,
      toToken: toTokenData[toChainIndex].tokens[toTokenIndex],
      toAddress: toAddress,
    });
  }, [
    fetchQuote,
    resetQuote,
    debouncedFromAmount,
    fromChainIndex,
    fromTokenIndex,
    toAddress,
    toChainIndex,
    toTokenIndex,
    walletAddress,
  ]);

  return (
    <>

      <div className="flex flex-col h-full">
        <Header />
        {showingToast && (
          <Toast
            title={toastMessage.title}
            description={toastMessage.subTitle}
            IconSvg={toastMessage.icon === "transaction" ? ConfirmHexagonSvg : ErrorHexagonSvg}
            className="mt-[-24px] mb-[20px] lg:mb-0"
          />
        )}
        <div className="flex px-[24px] lg:px-[64px] animate-fadeIn">
          <div className="flex flex-col gap-[32px] mt-[48px] lg:xl-[145px] mx-auto p-[24px] shadow-xxl">
            {swapStatus.status === SwapStatus.DONE ? (
              <div className="flex flex-col gap-[14px] items-center">
                <HexagonTickIcon
                  bgColor="#32CC86"
                  borderColor="#00B67A"
                  width={76.26}
                  height={69}
                />
                <h3 className="text-[32px] leading-[1.1] text-grey-dark">
                  Transaction Success
                </h3>
              </div>
            ) : swapStatus.status === SwapStatus.FAILED ? (
              <div className="flex flex-col gap-[14px] items-center">
                <ErrorHexagonSvg width={76.26} height={69} />
                <h3 className="text-[32px] leading-[1.1] text-grey-dark">
                  Transaction Failed
                </h3>
              </div>
            ) : (
              <h3 className="text-[32px] leading-[1.1] text-grey-dark">
                Bridge + Swap
              </h3>
            )}
            <div className="flex flex-col gap-[17px]">
              {swapStatus.status === SwapStatus.DONE ||
                swapStatus.status === SwapStatus.FAILED ||
                swapStatus.status === SwapStatus.INVALID ||
                swapStatus.status === SwapStatus.NOT_FOUND ? (
                <>
                  <div className="flex items-center">
                    <AssetWithChain
                      size={25}
                      tokenImageId={
                        fromTokenData[fromChainIndex].tokens[fromTokenIndex]
                          .tokenImageId
                      }
                      chainImageName={
                        fromTokenData[fromChainIndex].chainImageName
                      }
                      tokenSymbol={
                        fromTokenData[fromChainIndex].tokens[fromTokenIndex]
                          .tokenSymbol
                      }
                    />
                    <div className="ml-[8px]">
                      <p className="font-caption text-[20px] leading-[1.14] text-grey-black">
                        {fromAmount}
                      </p>
                      <p className="font-normal text-[12px] leading-[1.25] text-grey-deep">
                        from {fromTokenData[fromChainIndex].chainName}
                      </p>
                    </div>
                    <div className="flex items-center gap-[4px] ml-auto h-[29px] px-[8px] rounded-[8px] border-[1px] border-yellow-dark bg-grey-lighter10">
                      <ConnectedSvg width={16.22} />
                      <p className="font-normal text-[12px] leading-[1.25] text-grey-dark">
                        {formatAddress(walletAddress, 7, 7)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <AssetWithChain
                      size={25}
                      tokenImageId={
                        toTokenData[toChainIndex].tokens[toTokenIndex]
                          .tokenImageId
                      }
                      chainImageName={toTokenData[toChainIndex].chainImageName}
                      tokenSymbol={
                        toTokenData[toChainIndex].tokens[toTokenIndex]
                          .tokenSymbol
                      }
                    />
                    <div className="ml-[8px]">
                      <p className="font-caption text-[20px] leading-[1.14] text-grey-black">
                        {quote?.estimate?.toAmount
                          ? ethers.utils.formatUnits(
                            quote?.estimate?.toAmount,
                            toTokenData[toChainIndex].tokens[toTokenIndex]
                              .decimals
                          )
                          : ""}
                      </p>
                      <p className="font-normal text-[12px] leading-[1.25] text-grey-deep">
                        to {toTokenData[toChainIndex].chainName}
                      </p>
                    </div>
                    <div className="flex items-center gap-[4px] ml-auto h-[29px] px-[8px] rounded-[8px] border-[1px] border-yellow-dark bg-grey-lighter10">
                      <ConnectedSvg width={16.22} />
                      <p className="font-normal text-[12px] leading-[1.25] text-grey-dark">
                        {formatAddress(toAddress, 7, 7)}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-[14px]">
                    <div className="flex justify-between items-center">
                      <p className="font-caption text-[18px] leading-[1.46] text-grey-dark">
                        From
                      </p>
                      {walletAddress ? (
                        <div className="flex items-center gap-[4px] h-[29px] px-[8px] rounded-[8px] border-[1px] border-yellow-dark bg-grey-lighter10">
                          <ConnectedSvg width={16.22} />
                          <p className="font-normal text-[12px] leading-[1.25] text-grey-dark">
                            {walletAddress}
                          </p>
                          <CloseSvg
                            className="stroke-grey-deep fill-grey-deep ml-[2px] cursor-pointer"
                            width={10}
                            onClick={disconnect}
                          />
                        </div>
                      ) : (
                        <button
                          className="flex items-center font-bold font-caption h-[29px] gap-[4px] px-[8px] rounded-[8px] bg-grey-lighter10"
                          onClick={showConnectModal}
                        >
                          <WalletGreyIcon />
                          <p className="font-caption text-[14px] leading-[1.1] text-grey-deep">
                            Connect Wallet
                          </p>
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <AmountInput
                        value={fromAmount}
                        setValue={setFromAmount}
                        className="w-[252px] h-[54px]"
                        disabled={isFetchingQuote}
                      />
                      <TokenSelectControl
                        className="w-[184px] h-[54px]"
                        tokenSymbol={
                          fromTokenData[fromChainIndex].tokens[fromTokenIndex]
                            .tokenSymbol
                        }
                        tokenImageId={
                          fromTokenData[fromChainIndex].tokens[fromTokenIndex]
                            .tokenImageId
                        }
                        chainName={fromTokenData[fromChainIndex].chainName}
                        chainImageName={
                          fromTokenData[fromChainIndex].chainImageName
                        }
                        onClick={() => setShowingFromTokenSelectModal(true)}
                      />
                    </div>
                  </div>
                  {/* <button className="flex items-center justify-center mx-auto rounded-full bg-grey-dark w-[32px] h-[32px] shadow-xxl2">
                    <SwitchVerticalIcon />
                  </button> */}
                  <div className="flex flex-col gap-[14px]">
                    <div className="flex justify-between items-center">
                      <p className="font-caption text-[18px] leading-[1.46] text-grey-dark">
                        To
                      </p>
                      {showingToAddressInput ? (
                        <div
                          className={`flex items-center gap-[4px] h-[29px] px-[8px] rounded-[8px] border-[1px] bg-grey-lighter10 ${WAValidator.validate(toAddress, "Solana")
                            ? "border-yellow-dark"
                            : "border-red-light bg-red-mild"
                            }`}
                        >
                          <ConnectedSvg width={16.22} />
                          {/* <p className="font-normal text-[12px] leading-[1.25] text-grey-dark">
                            {toAddress}
                          </p> */}
                          <input
                            type="text"
                            className="min-w-[310px] font-normal text-[12px] leading-[1.25] text-grey-dark border-none bg-transparent outline-none"
                            ref={toAddressInputRef}
                            value={toAddress}
                            onChange={(e) => setToAddress(e.target.value)}
                          />
                          <CloseSvg
                            className="stroke-grey-deep fill-grey-deep ml-[2px] cursor-pointer"
                            width={10}
                            onClick={() => setShowingToAddressInput(false)}
                          />
                        </div>
                      ) : (
                        <div className="flex gap-[8px] items-center">
                          {solanaAddressError && (
                            <p className="text-red-light text-[12px] leading-[1.25]">
                              Paste a valid Solana address.
                            </p>
                          )}
                          <button
                            onClick={handlePasteAddress}
                            className="flex items-center font-bold font-caption h-[29px] gap-[4px] px-[8px] rounded-[8px] bg-white border-grey-deep border-[1px]"
                          >
                            <p className="font-caption text-[14px] leading-[1.1] text-grey-deep">
                              Paste Address
                            </p>
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <AmountInput
                        value={
                          quote?.estimate?.toAmount
                            ? ethers.utils.formatUnits(
                              quote?.estimate?.toAmount,
                              toTokenData[toChainIndex].tokens[toTokenIndex]
                                .decimals
                            )
                            : ""
                        }
                        isLoading={isFetchingQuote}
                        className="w-[252px] h-[54px]"
                        disabled
                      />
                      <TokenSelectControl
                        className="w-[184px] h-[54px]"
                        tokenSymbol={
                          toTokenData[toChainIndex].tokens[toTokenIndex]
                            .tokenSymbol
                        }
                        tokenImageId={
                          toTokenData[toChainIndex].tokens[toTokenIndex]
                            .tokenImageId
                        }
                        chainName={toTokenData[toChainIndex].chainName}
                        chainImageName={
                          toTokenData[toChainIndex].chainImageName
                        }
                        onClick={() => setShowingToTokenSelectModal(true)}
                      />
                    </div>
                    {errorQuote && (
                      <p className="text-red-light text-center text-[14px] leading-[15px]">
                        Not supported bridge
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
            {(swapStatus.status === SwapStatus.FAILED ||
              swapStatus.status === SwapStatus.INVALID ||
              swapStatus.status === SwapStatus.NOT_FOUND) && (
                <ErrorBox
                  title={"Something went wrong"}
                  body={
                    "No funds were debited. Please verify the transaction<br>details and try again. <a class='underline'>Click here to read a report</a>"
                  }
                />
              )}
            <div className="flex flex-col gap-[16px]">
              {swapStatus.status === SwapStatus.DONE ? (
                <div className="flex gap-[16px]">
                  <Button
                    isLink
                    link={getTxnLink(
                      fromTokenData[fromChainIndex].chainImageName,
                      fromChainTxnHash
                    )}
                    type={3}
                    className="mx-auto w-[214px] max-w-[214px] !bg-white !text-yellow-dark !border-yellow-dark hover:!bg-yellow-dark hover:!text-grey-dark"
                  >
                    View on {fromTokenData[fromChainIndex].chainName}
                  </Button>
                  <Button type={3} className="mx-auto w-[214px] max-w-[214px]">
                    View on {toTokenData[toChainIndex].chainName}
                  </Button>
                </div>
              ) : swapStatus.status === SwapStatus.FAILED ? (
                <Button type={3} className="w-full" onClick={handleResetSwap}>
                  Start Again
                </Button>
              ) : isFetchingQuote ? (
                <Button type={3} className="mx-auto w-full" disabled>
                  <Loader.MoonLoader color="black" size={24} />
                </Button>
              ) : provider && quote?.transactionRequest ? (
                <ApproveTransaction
                  fromToken={fromTokenData[fromChainIndex].tokens[fromTokenIndex].tokenAddress}
                  fromAmount={ethers.utils.parseUnits(fromAmount, fromTokenData[fromChainIndex].tokens[fromTokenIndex].decimals)}
                  transactionRequest={quote.transactionRequest}
                  setTransactionStatus={setTransactionStatus}
                  isReset={isTransactionReset}
                />) : (
                <Button
                  type={3}
                  className={walletAddress ? "mx-auto w-full !bg-grey-light !text-white" : "mx-auto w-full"}
                  onClick={showConnectModal}
                  disabled={!!walletAddress}
                >
                  {!walletAddress ? <> <ConnectSvg />  Connect Wallet </> : <>Connected</>}

                </Button>
              )}
              {swapStatus.status === SwapStatus.NONE ? <div className="flex flex-col gap-[8px]">
                {Object.entries(quoteInfo).map(([key, { value, tooltip, label }]) => (<div key={label} className="flex items-center">
                  <TooltipContainer tooltipContent={tooltip}>
                    <div className="flex items-center group">
                      <p className="text-grey-deep text-[12px] leading-[1.25] font-normal group-hover:text-grey-black cursor-default">
                        {label}
                      </p>
                      <InfoSvg className="ml-[4.83px] stroke-grey-deep group-hover:stroke-grey-black" />
                    </div>
                  </TooltipContainer>
                  <p className="text-grey-black text-[12px] leading-[1.25] font-normal ml-auto">
                    {value}
                  </p>
                </div>))}
              </div> : 
              <div className="flex flex-col items-center w-full">
                <div className="flex items-center group">
                  <p className="text-black text-[16px] font-bold">Status :&nbsp;</p>
                  <p className="text-grey-deep text-[14px] leading-[1.25] font-normal group-hover:text-grey-black cursor-default mt-1">
                    {swapStatus.status}
                  </p>
                </div>
                <p className="text-grey-deep text-[14px] w-[410px] text-center border-box leading-[1.25] font-normal group-hover:text-grey-black cursor-default mt-1.25">
                    {swapSubstatus}
                  </p>
              </div>}
            </div>
          </div>
        </div>
        <div className="mt-auto pt-[72px]">
          <Footer />
        </div>
      </div>
      {showingFromTokenSelectModal && (
        <TokenSelectModal
          title={"Swap From"}
          data={fromTokenData}
          chainIndex={fromChainIndex}
          tokenIndex={fromTokenIndex}
          onSelect={handleFromTokenSelect}
          onClose={() => setShowingFromTokenSelectModal(false)}
        />
      )}
      {showingToTokenSelectModal && (
        <TokenSelectModal
          title={"Swap To"}
          data={toTokenData}
          chainIndex={toChainIndex}
          tokenIndex={toTokenIndex}
          onSelect={handleToTokenSelect}
          onClose={() => setShowingToTokenSelectModal(false)}
        />
      )}
      {modalType === ModalType.ConnectModal && <ConnectModal />}
      {modalType === ModalType.DisconnectModal && (
        <DisconnectModal handleDisconnect={handleDisconnect} />
      )}
    </>
  );
}
