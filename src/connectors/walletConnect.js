import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";

export const [walletConnect, hooks] = initializeConnector(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        rpc: {
          1: `https://mainnet.infura.io/v3/193355390d974f479a2724087b20a43b`,
        },
        // rpc: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`,
        bridge: "https://bridge.walletconnect.org",
        qrcode: true,
      },
    })
);
