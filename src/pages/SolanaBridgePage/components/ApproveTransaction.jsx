import React, { useState, useEffect } from 'react';
import { useApproveTransaction } from "src/hooks/useApproveTransaction";
import { ReactComponent as ConnectedSvg2 } from "src/assets/img/icons/connected2.svg";
import * as Loader from "react-spinners";
import { Button } from "src/components/lib";
import { ErrorBox } from "./ErrorBox";
import { SwapStatus } from 'src/constants/enums';

const ApproveTransaction = ({ fromToken, fromAmount, transactionRequest, setTransactionStatus,isReset }) => {

    const [details, setDetails] = useState({ fromToken, fromAmount, transactionRequest });

    useEffect(() => {

        setDetails({ fromToken, fromAmount, transactionRequest })

    }, [fromToken, fromAmount, transactionRequest]);



    const {
        run: confirmTransaction,
        success: txnSuccess,
        error: errorConfirmingTransaction,
        resetError,
        setSuccess,
        loading: isConfirmingTransaction,
        fromChainTxnHash,
        approvalLoading: isApprovingTransaction,
        approveTransaction: walletTransactionApprovel,
        transactionApproveStatus,
        transactionApproveError
    } = useApproveTransaction();


    useEffect(()=>{
        if(isReset)setSuccess(false);
    },[isReset])


    useEffect(() => {
        if (transactionApproveStatus) {
            confirmTransaction(details.transactionRequest);
        }

    }, [transactionApproveStatus]);

    useEffect(() => {
        if (fromChainTxnHash.length) {
            setTransactionStatus({ error: false, txHash: fromChainTxnHash, status: false })
        }
    }, [fromChainTxnHash])

    useEffect(() => {
        if (txnSuccess) {
            setTransactionStatus({ error: false, txHash: fromChainTxnHash, status: true })
        }
    }, [txnSuccess])

    const handleApprove = async () => {

        if (!details.fromToken.isNative) {
            walletTransactionApprovel(details.fromToken, details.fromAmount);
        } else {
            confirmTransaction(details.transactionRequest);
        }
    }

    return (<>

        {errorConfirmingTransaction && (
            <ErrorBox
                title={"Transaction Failed"}
                body={
                    "No funds were debited. Please verify the transaction<br>details and try again."
                }
            />
        )}
        {transactionApproveError && (<ErrorBox
            title={"Transaction Rejected"}
            body={
                "No funds were debited. Please verify the transaction<br>details and try again."
            }
        />)}

        <Button
            type={3}
            className="mx-auto w-full"
            onClick={handleApprove}
            disabled={isApprovingTransaction || isConfirmingTransaction || txnSuccess}
        >
            {((isApprovingTransaction || isConfirmingTransaction)) ? ((isConfirmingTransaction) ? (<>
                Transaction Is Pending
                <Loader.MoonLoader color="black" size={24} />
            </>) : <>
                Approval Is Pending
                <Loader.MoonLoader color="black" size={24} />
            </>
            ) : (((txnSuccess) ? <>
                Bridging In Progress
                <Loader.MoonLoader color="black" size={24} />
            </> :
                <>
                    <ConnectedSvg2 />
                    Send For Approval
                </>)
            )}
        </Button>

    </>)
}

export default ApproveTransaction;