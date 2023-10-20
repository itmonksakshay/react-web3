import { useState } from "react";
import Checkbox from "react-custom-checkbox";
import { ReactComponent as CheckMarkIcon } from "src/assets/img/icons/checkmark.svg";
import { ReactComponent as CloseIcon } from "src/assets/img/icons/close.svg";
import { useModal } from "src/contexts/ModalContext";
import { Button } from "../lib";
import { useMobile } from "src/hooks/useMobile";
import { isDarkMode } from "src/utils/helpers";

export function TermsModal() {
  const [agreed, setAgreed] = useState(false);
  const { closeModal } = useModal();
  const isDark = isDarkMode();

  const handleChange = (e) => {
    setAgreed(e);
  };

  const handleContinue = () => {
    localStorage.setItem("agreed", 1);
    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 z-20 w-full h-full overflow-y-auto bg-grey-black43 animate-fadeIn">
      <div className="max-w-[327px] lg:max-w-[616px] bg-white dark:bg-grey-dark pt-[20px] pb-[32px] px-[24px] lg:px-[32px] mt-[54px] lg:mt-[147px] mb-[100px] mx-auto rounded-[8px]">
        <div className="flex">
          <button className="w-[12px] h-[12px] ml-auto mt-[6px] mr-[6px] bg-none border-none invisible">
            <CloseIcon className="stroke-black dark:stroke-grey-deep" />
          </button>
        </div>
        <h3 className="mt-[6px] text-[30px] text-grey-darkest dark:text-white text-center leading-[1.1]">
          Welcome to One Click Crypto
        </h3>
        <p className="mt-[24px] text-[16px] text-grey-deep text-left lg:text-center leading-[1.2] font-normal tracking-[-0.5px]">
          One Click Crypto is an educational and research platform about Crypto
          and Decentralized Finance (DeFi).
          <br /> <br />
          One Click Crypto doesn’t provide investment or financial advise. None
          of the contents contained on One Click Crypto website constitutes an
          offer or solicitation to buy or sell any financial products.
          <br /> <br />
          By accessing One Click crypto website, you agree to our{" "}
          <a
            href="https://www.oneclick.fi/terms-of-service-defi"
            target="_blank"
            rel="noreferrer"
            className="text-yellow-dark"
          >
            Terms of Services
          </a>{" "}
          and{" "}
          <a
            href="https://www.oneclick.fi/privacy-policy-defi"
            target="_blank"
            rel="noreferrer"
            className="text-yellow-dark"
          >
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex mt-[24px] lg:mt-[28.5px] lg:justify-center">
          <Checkbox
            checked={agreed}
            onChange={handleChange}
            icon={
              <div className="flex items-center justify-center w-full h-full bg-yellow-dark">
                <CheckMarkIcon className="stroke-white dark:stroke-grey-dark" />
              </div>
            }
            containerClassName="cursor-pointer gap-[5.5px] dark:text-white"
            borderColor={agreed ? "#E9BE5C" : isDark ? "#333333" : "#A7A7A7"}
            borderWidth={2}
            borderRadius={4}
            size={21}
            label="I confirm that I have read and agree to this message."
          />
        </div>
        <Button
          type={7}
          className="mt-[24px] lg:mt-[28.5px] mx-auto"
          disabled={!agreed}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
