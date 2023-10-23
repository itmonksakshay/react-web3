import { ethers } from "ethers";
import { useCallback, useState } from "react";
import { useWallet } from "src/contexts/WalletContext";

export default function useNetworkSelector() {

    const { provider } = useWallet();
    const [networkChangeError, setNetworkError] = useState(false);
    const [networkChanged, setNetworkStatus] = useState(false);

    const networkData = [{
        chainId: "0x89",
        rpcUrls: ["https://polygon-rpc.com/"],
        chainName: "Matic Mainnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        blockExplorerUrls: ["https://polygonscan.com/"]
    }, {
        chainId: '0x38',
        chainName: 'Binance Smart Chain',
        nativeCurrency: {
            name: 'Binance Coin',
            symbol: 'BNB',
            decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com']
    },
    {
        chainId: '0xa4b1',
        chainName: 'Arbitrum LlamaNodes',
        nativeCurrency: {
            name: 'Arbitrum One',
            symbol: 'ARB',
            decimals: 18
        },
        rpcUrls: ['https://arbitrum.llamarpc.com'],
        blockExplorerUrls: ['https://arbiscan.io']
    },
    {
        chainId: '0xa86a',
        chainName: 'Avalanche C-Chain',
        nativeCurrency: {
            name: 'Avalanche C-Chain',
            symbol: 'AVAX',
            decimals: 18
        },
        rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
        blockExplorerUrls: ['https://snowtrace.io']
    }
]

    const addNetwork = async (chainId) => {


        const network = networkData.filter((item) => item.chainId === chainId);

        if (network && network.length) {

            try {

                if (typeof ethereum !== 'undefined') {
                    const result = await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: network
                    });

                    console.log(network, "networkError", result)

                    return true;

                }

            } catch (e) {
                throw new Error(e);
            }
        } else {
            throw new Error("No network");
        }

    };

    const getNetworkId = useCallback(async () => {

        const { chainId } = await provider.getNetwork();
        return chainId;
    }, [provider]);

    const setWalletNetwork = useCallback(async (networkId) => {

        const chainId = ethers.utils.hexlify(networkId)

        try {
            setNetworkError(false);
            setNetworkStatus(false);

            await provider.send('wallet_switchEthereumChain', [{ chainId }]);
            provider.on("network", (newNetwork, oldNetwork) => {
                if (oldNetwork) {
                    window.location.reload();
                }
            });
            setNetworkStatus(true)
            return true;

        }
        catch (e) {
            const networkError = e.message.includes("Unrecognized chain ID");
            if (networkError) {
                try {

                    await addNetwork(chainId);
                    setNetworkStatus(true)
                    return true;

                } catch (e) {

                    setNetworkError(true);
                    return false;

                }

            } else {
                setNetworkError(true);
                return false;
            }
        }



    }, [provider])

    return { getNetworkId, setWalletNetwork, networkChanged, networkChangeError };

}