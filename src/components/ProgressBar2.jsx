export function ProgressBar2({
  value = 0,
  max = 100,
  showTick = false,
  showShadow = false,
  color = "#E9BE5C",
  className,
}) {
  return (
    <div className={className}>
      {showTick && (
        <div className="relative h-[55px]">
          <div
            className={`absolute bottom-0 flex flex-col gap-[7px] items-center -translate-x-1/2`}
            style={{
              left: "2.5%",
            }}
          >
            <p className="font-medium text-grey-black">0</p>
            <div className="w-0 h-[22px] border-dotted border-grey-deep border-l-[1px]" />
          </div>
          <div
            className={`absolute bottom-0 flex flex-col gap-[7px] items-center -translate-x-1/2`}
            style={{
              left: `${2.5 + (value / max) * 95}%`,
            }}
          >
            <p className="text-yellow-dark text-[24px] font-normal leading-[1.2] tracking-[-0.5px]">
              {value}
            </p>
            <div className="w-0 h-[22px] border-dotted border-grey-deep border-l-[1px]" />
          </div>
          <div
            className={`absolute bottom-0 flex flex-col gap-[7px] items-center -translate-x-1/2`}
            style={{
              left: "97.5%",
            }}
          >
            <p className="font-medium text-grey-black">{max}</p>
            <div className="w-0 h-[22px] border-dotted border-grey-deep border-l-[1px]" />
          </div>
        </div>
      )}
      <div
        className="relative w-full h-[8px] rounded-full bg-gradient2 dark:bg-gradient1"
        style={{
          boxShadow:
            "inset 0px 0px 43.0664px rgba(255, 255, 255, 0.05), inset 0px 2.53332px 2.53332px rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(8.23328px)",
        }}
      >
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-yellow-dark"
          style={{
            boxShadow: showShadow ? "0px 0px 6px #E8B844" : "none",
            width: `${2.5 + (value / max) * 95}%`,
            background: color === "#FFFFFF" ? "#E9BE5C" : color,
          }}
        />
      </div>
    </div>
  );
}
