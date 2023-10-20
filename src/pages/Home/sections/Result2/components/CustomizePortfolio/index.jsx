import { Button, ErrorBox } from "src/components/lib";
import { PortfolioTypeSelect } from "./components/PortfolioTypeSelect";
import { RateSlider } from "src/components/RateSlider";
import { ChainSelect } from "./components/ChainSelect";
import { chainOptions } from "src/constants/chainOptions";
import { ClipLoader } from "react-spinners";
import { isDarkMode } from "src/utils/helpers";
import { ProtocolSelect } from "./components/ProtocolSelect";
import { useProtocolOptions } from "src/hooks/useProtocolOptions";

export function CustomizePortfolio({
  show = false,
  isLoading = false,
  error = "",
  handleSave,
  handleClose,
  settings,
  setSettings,
}) {
  const {protocolOptions, isLoadingProtocolOptions} = useProtocolOptions();
  
  const handlePortfolioTypeSelectChange = (value) => {
    setSettings((settings) => ({
      ...settings,
      portfolioType: value,
    }));
  };

  const handleRiskScoreChange = (value) => {
    setSettings((settings) => ({
      ...settings,
      riskScore: value,
    }));
  };

  const handleDiversificationChange = (value) => {
    setSettings((settings) => ({
      ...settings,
      diversification: value,
    }));
  };

  const handleChainSelectChange = (selected) => {
    if (selected.length === 0)
      setSettings((settings) => ({
        ...settings,
        selected_chains: [chainOptions[0]],
      }));
    else if (
      selected.length > 1 &&
      selected.find((item) => item.value === "all")
    ) {
      setSettings((settings) => ({
        ...settings,
        selected_chains: settings.selected_chains.find(
          (item) => item.value === "all"
        )
          ? selected.filter((item) => item.value !== "all")
          : [chainOptions[0]],
      }));
    } else {
      setSettings((settings) => ({ ...settings, selected_chains: selected }));
    }
  };

  const handleProtocolSelectChange = (selected) => {
    if (selected.length === 0)
      setSettings((settings) => ({
        ...settings,
        selected_protocols: [protocolOptions[0]],
      }));
    else if (
      selected.length > 1 &&
      selected.find((item) => item.value === "all")
    ) {
      setSettings((settings) => ({
        ...settings,
        selected_protocols: settings.selected_protocols.find(
          (item) => item.value === "all"
        )
          ? selected.filter((item) => item.value !== "all")
          : [protocolOptions[0]],
      }));
    } else {
      setSettings((settings) => ({ ...settings, selected_protocols: selected }));
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      {show && (
        <div
          className="fixed top-0 left-0 w-full h-full"
          onClick={handleClose}
        />
      )}
      <div
        className={`absolute right-[62px] top-[177px] w-[506px] p-[24px] bg-white dark:bg-grey-dark rounded-[4px] transition-all duration-500 ${
          show
            ? "visible opacity-1 translate-y-[0px]"
            : "invisible opacity-0 translate-y-[-50px]"
        }`}
        style={{
          boxShadow: "2px 29px 39px rgba(0, 0, 0, 0.23)",
          backdropFilter: "blur(7px)",
        }}
        onClick={handleClick}
      >
        <div className="flex items-center">
          <h3 className="font-medium text-[32px] leading-[1.1] text-grey-dark dark:text-white">
            Customize Portfolio
          </h3>
          <Button
            type={7}
            onClick={handleSave}
            disabled={isLoading}
            className="ml-auto h-[40px] !max-w-[166px] !min-w-[166px] max-h-[40px]"
          >
            {isLoading ? (
              <>
                Saving
                <ClipLoader
                  color={isDarkMode() ? "white" : "#1E1E1E"}
                  size={15}
                />
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
        {error && (
          <ErrorBox error={error} hideErrorLabel className="mt-[10px]" />
        )}
        <h5 className="text-[18px] leading-[1.46] text-grey-dark dark:text-white font-medium mt-[16px]">
          Portfolio Type
        </h5>
        <p className="text-[12px] leading-[1.25] font-normal text-grey-deep mt-[2px]">
          You can change the level of personalization for your portfolio
        </p>
        <PortfolioTypeSelect
          value={settings.portfolioType}
          onChange={handlePortfolioTypeSelectChange}
          className="mt-[16px]"
        />
        <h5 className="text-[18px] leading-[1.46] text-grey-dark dark:text-white font-medium mt-[16px]">
          Chain
        </h5>
        <p className="text-[12px] leading-[1.25] font-normal text-grey-deep mt-[2px]">
          You can filter the pools in your portfolio by specific chains
        </p>
        <ChainSelect
          selected={settings.selected_chains}
          onChange={handleChainSelectChange}
          className="mt-[16px]"
        />
        <h5 className="text-[18px] leading-[1.46] text-grey-dark dark:text-white font-medium mt-[16px]">
          Protocol
        </h5>
        <p className="text-[12px] leading-[1.25] font-normal text-grey-deep mt-[2px]">
          You can filter the pools in your portfolio by specific protocols
        </p>
        <ProtocolSelect
          selected={settings.selected_protocols}
          protocolOptions={protocolOptions}
          isLoading={isLoadingProtocolOptions}
          onChange={handleProtocolSelectChange}
          className="mt-[16px]"
        />
        <h5 className="text-[18px] leading-[1.46] text-grey-dark dark:text-white font-medium mt-[16px]">
          Risk Score
        </h5>
        <p className="text-[12px] leading-[1.25] font-normal text-grey-deep mt-[2px]">
          You can adjust your risk score and generate a new portfolio based on
          it
        </p>
        <RateSlider
          value={settings.riskScore}
          onChange={handleRiskScoreChange}
          showTooltip={false}
          showLabel={false}
          className="mt-[64px] w-[calc(100%-26px)] mx-auto"
        />
        <h5 className="text-[18px] leading-[1.46] text-grey-dark dark:text-white font-medium mt-[96px]">
          Diversification
        </h5>
        <p className="text-[12px] leading-[1.25] font-normal text-grey-deep mt-[2px]">
          You can change the number of pools in your portfolio
        </p>
        <RateSlider
          min={3}
          max={40}
          step={1}
          value={settings.diversification}
          onChange={handleDiversificationChange}
          showTooltip={false}
          showLabel={false}
          className="mt-[64px] w-[calc(100%-26px)] mx-auto mb-[96px]"
        />
      </div>
    </>
  );
}
