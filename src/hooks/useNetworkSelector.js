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

            await provider.send('wallet_switchEthereumChain',[{ chainId:ethers.utils.hexlify(chainId)}]);
            provider.on("network", (newNetwork, oldNetwork) => {
                // When a Provider makes its initial connection, it emits a "network"
                // event with a null oldNetwork along with the newNetwork. So, if the
                // oldNetwork exists, it represents a changing network
                console.log(newNetwork,'newNetwork');
                if (oldNetwork) {
                    console.log(oldNetwork,'oldNetwork');
                    window.location.reload();
                }
            });
            setNetworkStatus(true)
   
        }
        catch(e){
            setNetworkError(true)

        }



    },[provider])

    return { getNetworkId,setWalletNetwork,networkChanged,networkChangeError };

}