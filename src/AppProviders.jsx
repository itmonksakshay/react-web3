import { Web3ReactProvider } from "@web3-react/core";
import { BrowserRouter } from "react-router-dom";
import { WalletProvider } from "./contexts/WalletContext";
import { DiscordProvider } from "./contexts/DiscordContext";
import { ModalProvider } from "./contexts/ModalContext";
import { ToastProvider } from "./contexts/ToastContext";
import { TurnstileProvider } from "./contexts/TurnstileContext";

import {
  metaMask,
  metaMaskHooks,
  trustWallet,
  trustWalletHooks,
  walletConnect,
  walletConnectHooks,
} from "./connectors";

const connectors = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [trustWallet, trustWalletHooks],
];

export function AppProviders({ children }) {
  return (
    <Web3ReactProvider connectors={connectors}>
      <BrowserRouter>
        <WalletProvider>
          <DiscordProvider>
            <ModalProvider>
              <ToastProvider>
                {/* <TurnstileProvider>{children}</TurnstileProvider> */}
                {children}
              </ToastProvider>
            </ModalProvider>
          </DiscordProvider>
        </WalletProvider>
      </BrowserRouter>
    </Web3ReactProvider>
  );
}
