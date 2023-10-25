export const WalletType = {
  None: "None",
  Metamask: "Metamask",
  WalletConnect: "WalletConnect",
  TrustWallet: "TrustWallet",
};

export const ModalType = {
  None: "None",
  ConnectModal: "ConnectModal",
  DisconnectModal: "DisconnectModal",
  JoinModal: "JoinModal",
  ThanksModal: "ThanksModal",
  SkipModal: "SkipModal",
  SkipQuestionModal: "SkipQuestionModal",
  RestartModal: "RestartModal",
  TermsModal: "TermsModal",
  WalletAnalyzeModal: "WalletAnalyzeModal",
  SolanaAddressModal: "SolanaAddressModal"
};

export const SwapStatus = {
  NONE: "NONE",
  NOT_FOUND: "NOT_FOUND",
  INVALID: "INVALID",
  PENDING: "PENDING",
  DONE: "DONE",
  FAILED: "FAILED",
};

export const SwapSubstatus = {
  NONE: "NONE",
  [SwapStatus.PENDING]: {
    WAIT_SOURCE_CONFIRMATIONS: {
      name: "WAIT_DESTINATION_TRANSACTION",
      description: "The bridge is waiting for additional confirmations.",
    },
    WAIT_DESTINATION_TRANSACTION: {
      name: "WAIT_DESTINATION_TRANSACTION",
      description:
        "The off-chain logic is in progress, waiting for the destination transaction to be mined. Check back later.",
    },
    BRIDGE_NOT_AVAILABLE: {
      name: "BRIDGE_NOT_AVAILABLE",
      description:
        "The bridge API / subgraph is temporarily unavailable, check back later.",
    },
    CHAIN_NOT_AVAILABLE: {
      name: "CHAIN_NOT_AVAILABLE",
      description:
        "The RPC for the source/destination chain is temporarily unavailable.",
    },
    REFUND_IN_PROGRESS: {
      name: "REFUND_IN_PROGRESS",
      description:
        "The refund has been requested and it's being processed (not all bridges will go through this state!)",
    },
    UNKNOWN_ERROR: {
      name: "UNKNOWN_ERROR",
      description: "We cannot determine the status of the transfer.",
    },
  },
  [SwapStatus.DONE]: {
    COMPLETED: {
      name: "COMPLETED",
      description: "The transfer was successful.",
    },
    PARTIAL: {
      name: "PARTIAL",
      description:
        "The transfer was partially successful. This can happen for specific bridges like across , multichain or connext which may provide alternative tokens in case of low liquidity.",
    },
    REFUNDED: {
      name: "REFUNDED",
      description:
        "The transfer was not successful and the sent token has been refunded",
    },
  },
  [SwapStatus.FAILED]: {
    NOT_PROCESSABLE_REFUND_NEEDED: {
      name: "NOT_PROCESSABLE_REFUND_NEEDED",
      description: "The transfer cannot be completed, a refund is required.",
    },
  },
};
