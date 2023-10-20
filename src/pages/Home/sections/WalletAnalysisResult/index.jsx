import { ReactComponent as AISvg } from "src/assets/img/icons/ai.svg";
import { ReactComponent as ConnectedSvg } from "src/assets/img/icons/connected.svg";
import { ReactComponent as ConnectedSvg2 } from "src/assets/img/icons/connected2.svg";
import { Button } from "src/components/lib";
import { ModalType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";
import { useWallet } from "src/contexts/WalletContext";
import { formatAddress } from "src/utils/helpers";
import { ChainLogo } from "../Result2/components/ChainLogo";
import { useNavigate } from "react-router-dom";

export function WalletAnalysisResult({ walletAnalysis = "" }) {
  const { walletAddress } = useWallet();
  const { showModal } = useModal();

  const navigate = useNavigate();

  const handleGeneratePortfolio = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="pt-[51px] px-[24px] animate-fadeIn">
      <div className="flex flex-col gap-[18px] max-w-[892px] mx-auto dark:text-white">
        <div
          className="p-[16px] bg-white dark:bg-grey-dark transition-all duration-300 rounded-[8px]"
          style={{
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.06)",
          }}
        >
          <h4 className="text-[20px] leading-[1.14]">Your address:</h4>
          <p className="font-normal text-[12px] leading-[1.25] mt-[4px]">
            Active since: 03.06.2017 10:14:15 UTC+0
          </p>
          <div className="flex flex-col lg:flex-row lg:items-center gap-[8px] mt-[8px]">
            <Button
              type={2}
              className="group h-[40px] !w-[180px]"
              onClick={() => showModal(ModalType.DisconnectModal)}
            >
              <ConnectedSvg className="group-hover:hidden" />
              <ConnectedSvg2 className="hidden group-hover:block" />
              {formatAddress(walletAddress)}
            </Button>
            <div className="flex flex-col gap-[2px] lg:ml-auto">
              <p className="text-[12px] leading-[1.25]">Active on:</p>
              <div className="flex">
                {walletAnalysis?.active_chains?.map((item, i) => (
                  <ChainLogo
                    chain={item}
                    size={24}
                    className="rounded-full border-2 border-white dark:border-grey-darker3 box-content"
                    style={{
                      zIndex: i,
                      marginLeft: i ? -10 : 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex gap-[16px] p-[16px] bg-white dark:bg-grey-dark transition-all duration-300 rounded-[8px]"
          style={{
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div>
            <AISvg
              style={{
                filter: "drop-shadow(0px 8px 7px rgba(0, 0, 0, 0.23))",
              }}
            />
          </div>
          <div>
            <h4 className="text-[20px] leading-[1.14] font-medium">
              Wallet Summary
            </h4>
            <p
              className="font-normal text-[14px] leading-[1.2] tracking-[-0.5px] mt-[16px]"
              dangerouslySetInnerHTML={{
                __html: walletAnalysis?.html,
              }}
            ></p>
          </div>
        </div>
        <div
          className="flex flex-col lg:flex-row lg:items-center gap-[16px] p-[16px] bg-white dark:bg-grey-dark transition-all duration-300 rounded-[8px]"
          style={{
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div className="flex lg:items-center gap-[8px] lg:gap-[16px]">
            <div>
              <AISvg
                style={{
                  filter: "drop-shadow(0px 8px 7px rgba(0, 0, 0, 0.23))",
                }}
              />
            </div>
            <h4 className="text-[20px] leading-[1.14] lg:max-w-[404px] font-medium">
              You can now let AI generate you a DeFi portfolio based on your
              wallet
            </h4>
          </div>
          <Button
            type={3}
            className="ml-auto max-h-[44px]"
            onClick={handleGeneratePortfolio}
          >
            Generate AI Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
}
