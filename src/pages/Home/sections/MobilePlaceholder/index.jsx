import { ReactComponent as CoutnerIcon } from "src/assets/img/icons/counter.svg";

export function MobilePlaceholder() {
  return (
    <div className="flex flex-col gap-[24px] pt-[81px] px-[24px] animate-fadeIn">
      <CoutnerIcon className="mx-auto" />
      <h3 className="text-center text-grey-dark text-[32px]">
        Mobile version coming soon...
      </h3>
      <p className="text-center text-grey-dark font-normal leading-[1.2] tracking-[-0.5px]">
        Please open your desktop web browser to use One Click Crypto app.
      </p>
    </div>
  );
}
