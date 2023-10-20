import { ReactComponent as HexagonBlackSvg } from "src/assets/img/icons/hexagon-black.svg";
import { ReactComponent as HexagonYellowSvg } from "src/assets/img/icons/hexagon-yellow.svg";
import { ReactComponent as HexagonSvg } from "src/assets/img/icons/hexagon.svg";

export function ChainLine({ value, total, checkedCount, className }) {
  return (
    <div className={className}>
      <ul className="flex gap-[13px] lg:gap-[18px]">
        {Array.from({ length: total }).map((_, i) => (
          <li
            key={i}
            className={`relative flex items-center justify-center text-[12px] lg:text-[16px] ${
              i > 0
                ? `before:absolute before:content-[' '] before:w-[13px] before:left-[-13px] lg:before:w-[18px] lg:before:left-[-18px] before:h-[1px] ${
                    i > Math.max(checkedCount - 1, value)
                      ? "before:bg-grey-lightest"
                      : "before:bg-yellow-dark"
                  }`
                : ""
            }`}
          >
            {i === value ? (
              <>
                <HexagonBlackSvg className="w-[30px] lg:w-[38px] dark:hidden" />
                <HexagonYellowSvg className="w-[30px] lg:w-[38px] hidden dark:block" />
                <span className="absolute -translate-x-1/2 -translate-y-1/2 text-yellow-dark dark:text-grey-dark left-1/2 top-1/2">
                  {i + 1 < 10 ? "0" : ""}
                  {i + 1}
                </span>
              </>
            ) : (
              <HexagonSvg
                className={`w-[20px] lg:w-[22px] ${
                  i < checkedCount
                    ? "fill-yellow-dark stroke-yellow-dark"
                    : "fill-none stroke-grey-lightest"
                }`}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
