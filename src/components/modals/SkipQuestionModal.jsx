import { ReactComponent as CloseIcon } from "src/assets/img/icons/close.svg";
import { useModal } from "src/contexts/ModalContext";
import { Button } from "../lib";

export function SkipQuestionModal({ handleSkip }) {
  const { closeModal } = useModal();

  return (
    <div className="fixed top-0 left-0 z-20 w-full h-full overflow-y-auto bg-grey-black43 animate-fadeIn">
      <div className="max-w-[327px] lg:max-w-[522px] bg-white dark:bg-grey-dark dark:text-white pt-[20px] pb-[32px] px-[32px] mt-[147px] mb-[100px] mx-auto rounded-[8px]">
        <div className="flex">
          <button
            onClick={closeModal}
            className="w-[12px] h-[12px] ml-auto mt-[6px] mr-[6px] bg-none border-none"
          >
            <CloseIcon className="stroke-grey-black dark:stroke-grey-deep" />
          </button>
        </div>
        <h3 className="mt-[6px] text-[30px] lg:text-[32px] text-center lg:text-left leading-[1.1]">
          Skip the questionnaire?
        </h3>
        <p className="mt-[24px] lg:mt-[12px] text-[16px] lg:text-[18px] text-center lg:text-left leading-[1.2] font-light tracking-[-0.5px] lg:h-[89px]">
          You will be redirected to the next step and will need to manually
          adjust your Risk Score.
        </p>
        <Button
          type={5}
          className="mt-[24px] lg:mt-[16px] w-full lg:w-[160px]"
          onClick={handleSkip}
        >
          Skip
        </Button>
      </div>
    </div>
  );
}
