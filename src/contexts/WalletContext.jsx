import { useWeb3React } from "@web3-react/core";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { metaMask, trustWallet, walletConnect } from "src/connectors";
import { isMobileDevice } from "src/utils/helpers";
import { WalletType } from "../constants/enums";

const WalletContext = createContext();
WalletContext.displayName = "Wallet Context";

function WalletProvider({ children }) {
  const [walletType, setWalletType] = useState(WalletType.None);
  const [walletAddress, setWalletAddress] = useState("");
  const location = useLocation();
  const fromMetamask = new URLSearchParams(location.search).get("metamask");

  const { account, isActive, provider } = useWeb3React();

  const connect = useCallback((walletType) => {
    if (walletType === WalletType.Metamask) {
      if (isMobileDevice()) {
        const metamaskAppDeepLink =
          "https://metamask.app.link/dapp/" +
          process.env.REACT_APP_DAPP_URL +
          "?metamask=true";
        window.location.href = metamaskAppDeepLink;
        return;
      } else {
        metaMask
          .activate()
          .catch((e) => console.log(`Error connecting with Metamask: ${e}`));
      }
    }
    if (walletType === WalletType.WalletConnect) {
      walletConnect
        .activate()
        .catch((e) =>
          console.log(`Error connecting with Wallet Connect: ${e}`)
        );
    }
    if (walletType === WalletType.TrustWallet) {
      trustWallet
        .activate()
        .catch((e) => console.log(`Error connecting with Trust Wallet: ${e}`));
    }
    setWalletType(walletType);
  }, []);

  const disconnect = useCallback(() => {
    if (walletType === WalletType.None) setWalletAddress("");
    if (walletType === WalletType.Metamask) {
      if (isMobileDevice()) {
        setWalletAddress("");
      } else {
        metaMask.resetState();
      }
    } else if (walletType === WalletType.WalletConnect) {
      walletConnect.resetState();
    } else if (walletType === WalletType.TrustWallet) {
      trustWallet.resetState();
    }
    setWalletType(WalletType.None);
  }, [walletType]);

  useEffect(() => {
    (async () => {
      if (fromMetamask) {
        if (!window.ethereum) {
          window.location.href = "https://metamask.io/download/";
          return;
        }
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setWalletType(WalletType.Metamask);
      }
    })();
  }, [fromMetamask]);

  useEffect(() => {
    setWalletAddress(account);
  }, [account]);

  const value = useMemo(
    () => ({
      walletType,
      walletAddress,
      isActive,
      provider,
      setWalletAddress,
      connect,
      disconnect,
    }),
    [walletType, walletAddress, isActive, provider, connect, disconnect]
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

const useWallet = () => {
  const value = useContext(WalletContext);
  if (!value)
    throw new Error("useWallet hook must be used within WalletProvider");
  return value;
};

export { useWallet, WalletProvider };
