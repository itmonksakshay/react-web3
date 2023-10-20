import { ReactComponent as CloseIcon } from "src/assets/img/icons/close.svg";
import { useModal } from "src/contexts/ModalContext";
import { Button } from "../lib";

export function ConfirmModal({
  title,
  description,
  confirmButtonLabel,
  cancelButtonLabel,
  onConfirm,
}) {
  const { closeModal } = useModal();

  return (
    <div className="fixed top-0 left-0 z-20 w-full h-full overflow-y-auto bg-grey-black43 animate-fadeIn">
      <div className="max-w-[327px] lg:max-w-[450px] bg-white dark:bg-grey-dark dark:text-white pt-[20px] pb-[32px] px-[24px] lg:px-[32px] mt-[147px] mb-[100px] mx-auto rounded-[8px]">
        <div className="flex">
          <button
            onClick={closeModal}
            className="w-[12px] h-[12px] ml-auto mt-[6px] mr-[6px] bg-none border-none"
          >
            <CloseIcon className="stroke-grey-black dark:stroke-grey-deep" />
          </button>
        </div>
        <h3 className="mt-[6px] text-[32px] leading-[1.1]">{title}</h3>
        <p className="mt-[12px] text-[18px] leading-[1.2] font-light tracking-[-0.5px]">
          {description}
        </p>
        <div className="flex mt-[16px] gap-[12px]">
          <Button
            type={10}
            className="w-1/2 !bg-white border-grey-dark hover:!bg-yellow-deep dark:!bg-transparent dark:text-white dark:hover:!bg-yellow-deep dark:hover:text-grey-dark"
            onClick={closeModal}
          >
            {cancelButtonLabel}
          </Button>
          <Button type={10} className="w-1/2" onClick={onConfirm}>
            {confirmButtonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
