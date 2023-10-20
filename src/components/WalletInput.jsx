import WAValidator from "multicoin-address-validator";
import { useState } from "react";
import web3 from "web3";

import { ClipLoader } from "react-spinners";
import { ReactComponent as WarningSvg } from "src/assets/img/icons/warning.svg";
import { ChainLogo } from "src/pages/Home/sections/Result2/components/ChainLogo";

export function WalletInput({
  placeholder = "Paste your wallet address",
  buttonLabel = "Go",
  errorMessage = "Sorry, your wallet address is not supported",
  defaultValue = "",
  readOnly = false,
  isLoading = false,
  onSubmit,
  onChange,
  className,
}) {
  const [value, setValue] = useState(defaultValue);
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState("");
  const [addressChain, setAddressChain] = useState("");

  const [copied, setCopied] = useState(false);

  const filled =
    web3.utils.isAddress(value) || WAValidator.validate(value, "Solana");

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  const validate = () => {
    if (!value) {
      setError("");
      return;
    }

    if (web3.utils.isAddress(value) || WAValidator.validate(value, "Solana")) {
      setError("");
      setAddressChain("");
      return true;
    }

    if (WAValidator.validate(value, "Tron")) {
      setError(errorMessage);
      setAddressChain("Tron");
    } else if (WAValidator.validate(value, "Bitcoin")) {
      setError(errorMessage);
      setAddressChain("Bitcoin");
    } else if (WAValidator.validate(value, "Algorand")) {
      setError(errorMessage);
      setAddressChain("Algorand");
    } else {
      setError(errorMessage);
      setAddressChain("");
    }
    return false;
  };

  const submit = () => {
    if (validate()) {
      onSubmit?.(value);
    }
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
    validate();
  };

  const handleKeyUp = (e) => {
    if (e.code === "Enter") submit();
    else setError("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
  };

  return (
    <div className={`max-w-[458px] dark:bg-grey-dark bg-white ${className}`}>
      <div
        className={`flex rounded-[8px] border-[1px] pt-[7px] pb-[6px] px-[8.5px] dark:bg-grey-black ${
          filled
            ? "border-green-light"
            : error
            ? "border-red-light"
            : focus
            ? "border-yellow-dark dark:border-yellow-dark"
            : "border-grey-lightest dark:border-grey-darker3"
        }`}
        style={{
          boxShadow: "2px 23px 36px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(7px)",
        }}
      >
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyUp={handleKeyUp}
          readOnly={readOnly}
          className="border-none outline-none bg-none dark:bg-transparent text-grey-black dark:text-white grow-[1] font-body text-[14px] pr-[10px]"
        />
        {readOnly ? (
          <button
            type="button"
            className={`flex border-2 rounded-[8px] min-w-[60px] w-[72px] h-[42px] justify-center items-center font-bold font-caption ${
              copied
                ? "border-green-dark bg-green-light text-white"
                : "border-yellow-dark bg-white dark:bg-transparent text-grey-black dark:text-yellow-dark hover:bg-yellow-lightest dark:hover:bg-yellow-dark dark:hover:text-grey-black"
            }`}
            onClick={handleCopy}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        ) : (
          <button
            type="button"
            className={`border-2 rounded-[8px] min-w-[60px] h-[42px] flex justify-center items-center font-bold font-caption ${
              filled
                ? "border-yellow-light bg-yellow-dark text-grey-dark dark:border-yellow-dark"
                : error
                ? "border-red-light bg-grey-white text-red-light dark:bg-grey-darker4"
                : "border-grey-deep bg-grey-lightest dark:bg-grey-darker3 text-grey-darker"
            } ${
              buttonLabel === "Edit" ? "invisible w-[0px] !min-w-[0px]" : ""
            }`}
            disabled={isLoading}
            onClick={submit}
          >
            {isLoading ? <ClipLoader color="#1E1E1E" size={20} /> : buttonLabel}
          </button>
        )}
      </div>
      <div
        className="overflow-hidden transition-all ease-in-out duration-350"
        style={{
          height: error ? (addressChain ? 147 : 24) : 0,
        }}
      >
        <div className="flex gap-[5.46px] mt-[8px] justify-center items-center font-normal text-red-lighter uppercase text-[12px] leading-[1.25]">
          <WarningSvg />
          <p>
            {addressChain ? error : "Please input a correct wallet address"}
          </p>
        </div>
        {addressChain && (
          <div>
            <div className="mt-[24px] py-[12px] gap-[12px] flex flex-col rounded-[8px] border-[1px] border-grey-deep">
              <p className="text-center font-normal text-[12px] leading-[1.25] text-grey-deep">
                It looks like you’re trying to use an address from <br />
                <strong>{addressChain} chain</strong>. Please try an address on
                a different blockchain.
                <br />
                We currently support the main EVM-compatible chains:
              </p>
              <div className="flex gap-[10px] mx-auto">
                <ChainLogo chain="Avalanche" />
                <ChainLogo chain="Optimism" />
                <ChainLogo chain="Fantom" />
                <ChainLogo chain="BNB Chain" />
                <ChainLogo chain="Arbitrum" />
                <ChainLogo chain="Ethereum" />
                <ChainLogo chain="Polygon" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
