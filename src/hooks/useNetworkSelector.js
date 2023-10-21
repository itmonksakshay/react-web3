import { ethers } from "ethers";
import { useCallback, useState } from "react";
import { useWallet } from "src/contexts/WalletContext";

export default function useNetworkSelector(){

    const { provider } = useWallet();
    const [networkChangeError,setNetworkError] = useState(false);
    const [networkChanged,setNetworkStatus] = useState(false);
    
    const getNetworkId = useCallback(async()=>{

        const { chainId } = await provider.getNetwork();
        return chainId;
    },[provider]);

    const setWalletNetwork = useCallback(async(chainId)=>{

        try{
            setNetworkError(false);
            setNetworkStatus(false);
            await provider.send('wallet_switchEthereumChain',[{ chainId:ethers.utils.hexlify(chainId)}]);
            provider.on("network", (newNetwork, oldNetwork) => {
                if (oldNetwork) {
                    window.location.reload();
                }
            });
            setNetworkStatus(true)
            return true;
   
        }
        catch(e){
            setNetworkError(true)
            return false;

        }



    },[provider])

    return { getNetworkId,setWalletNetwork,networkChanged,networkChangeError };

}