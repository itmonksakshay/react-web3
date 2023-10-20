import { ethers } from "ethers";
import { useCallback, useState } from "react";
import { useWallet } from "src/contexts/WalletContext";

export function useApproveTransaction() {
  const { provider } = useWallet();
  const [success, setSuccess] = useState(false);
  const [fromChainTxnHash, setFromChainTxnHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = useCallback(
    async ({ tx, fromToken, fromAmount }) => {
      if (!provider) {
        console.log("no provider");
        return;
      }
      try {
        setLoading(true);
        setError("");
        setFromChainTxnHash("");

        const signer = provider.getSigner();
        if (!fromToken.isNative) {
          // approve token transfer
          const erc20Abi = [
            "function approve(address spender, uint256 amount) external returns (bool)",
          ];
          const fromTokenContract = new ethers.Contract(
            fromToken,
            erc20Abi,
            signer
          );
          // Approve the spender to use the amount you wish to transfer.
          const approveTx = await fromTokenContract.approve(
            "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE",
            fromAmount
          );
          await approveTx.wait();

          console.log("approved");
        }

        const txResponse = await signer.sendTransaction(tx);
        console.log("Transaction hash:", txResponse.hash);
        setFromChainTxnHash(txResponse.hash);
        await txResponse.wait();
        setSuccess(true);
        console.log("Transaction completed!");
      } catch (e) {
        setSuccess(false);
        setError(e.message);
        setFromChainTxnHash("");
      } finally {
        setLoading(false);
      }
    },
    [provider]
  );

  return { run, error, success, loading, fromChainTxnHash };
}
