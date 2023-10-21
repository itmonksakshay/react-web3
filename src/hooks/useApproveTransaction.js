import { ethers } from "ethers";
import { useCallback, useState } from "react";
import { useWallet } from "src/contexts/WalletContext";

export function useApproveTransaction() {
  const [success, setSuccess] = useState(false);
  const [fromChainTxnHash, setFromChainTxnHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [approvalLoading,setApprovalLoading] = useState(false);
  const [error, setError] = useState("");
  

  const [transactionApproveStatus, setTransactinApproveStatus] = useState(false);
  const [transactionApproveError, setTransactionApproveError] = useState(false);

  const { provider } = useWallet();
  let signer = null;

  if(provider) signer = provider.getSigner();

  const approveTransaction = useCallback(async (fromToken, fromAmount) => {

    if (!provider || !signer) {
      console.log("no provider");
      return;
    }
    try {
      setError("")
      setApprovalLoading(true);
      setTransactinApproveStatus(false);
      setTransactionApproveError(false);
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
      setTransactinApproveStatus(true);

    } catch (e) {
      setTransactionApproveError(true);
    }finally {
      setApprovalLoading(false);
    }
  }, [signer]);

  const run = useCallback(
    async (tx) => {
      if (!provider || !signer) {
        console.log("no provider");
        return;
      }
      try {
        setLoading(true);
        setError("");
        setFromChainTxnHash("");

        const txResponse = await signer.sendTransaction(tx);
        setFromChainTxnHash(txResponse.hash);
        await txResponse.wait();
        setSuccess(true);
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

  return {
    run,
    error,
    success,
    loading,
    fromChainTxnHash,
    resetError:
    setError,
    setTransactionApproveError,
    approvalLoading,
    approveTransaction,
    transactionApproveStatus,
    transactionApproveError
  };
}
