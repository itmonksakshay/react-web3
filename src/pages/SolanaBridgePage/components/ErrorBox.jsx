import { ReactComponent as ErrorHexagonSvg } from "src/assets/img/icons/hexagon-error.svg";

export function ErrorBox({ title, body, className }) {
  return (
    <div
      className={`flex items-center gap-[12px] px-[14px] py-[8px] rounded-[8px] bg-red-light-05 w-[444px] ${className}`}
    >
      <ErrorHexagonSvg />
      <div>
        <p className="text-red-light text-[16px] leading-[1.1]">{title}</p>
        <p
          className="text-red-light text-[12px] leading-[1.25] font-normal mt-[3px]"
          dangerouslySetInnerHTML={{ __html: body }}
        ></p>
      </div>
    </div>
  );
}
