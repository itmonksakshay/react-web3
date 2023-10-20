import React, { useRef, useState } from "react";

export function Tooltip({
  tipShadow = false,
  show = false,
  children,
  className,
}) {
  return (
    <div
      className={`absolute animate-fadeIn z-[4] w-[178px] top-[15px] right-[-30px] font-normal text-[12px] leading-[1.25] rounded-[4px] dark:bg-grey-darker3 before:absolute before:bg-white before:dark:bg-grey-darker3 before:top-[-5px] before:right-[30px] before:w-[10px] before:h-[10px] before:rotate-45 before:rounded-[2px] transition-all duration-500 before:transition-all before:duration-500 ${
        tipShadow ? "before:shadow-md before:z-[-1]" : ""
      } ${show ? "visible opacity-1" : "invisible opacity-0"} ${className}`}
      style={{
        boxShadow: "2px 29px 39px rgba(0, 0, 0, 0.23)",
        backdropFilter: "blur(7px)",
      }}
    >
      {children}
    </div>
  );
}

export function TooltipContainer({
  tooltipContent,
  tooltipClassName = "",
  children,
  ...props
}) {
  const [hover, setHover] = useState(false);

  const timeoutRef = useRef();

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setHover(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHover(false);
    }, 500);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-flex relative"
      {...props}
    >
      {children}
      <Tooltip
        show={hover}
        tipShadow
        className={`top-[28px] right-[-15px] ${tooltipClassName}`}
      >
        <div className="px-[8px] py-[4px] bg-white dark:bg-grey-darker3 dark:text-white rounded-[4px]">{tooltipContent}</div>
      </Tooltip>
    </div>
  );
}
