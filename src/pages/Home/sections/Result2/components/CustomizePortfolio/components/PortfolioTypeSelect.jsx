export function PortfolioTypeSelect({ value, onChange, className }) {
  return (
    <div
      className={`flex p-[6px] rounded-[8px] bg-grey-lightest-20 dark:bg-grey-white5 ${className}`}
    >
      <PortfolioTypeOption
        label="Less personalized"
        value="less"
        setValue={onChange}
        isSelected={value === "less"}
      />
      <PortfolioTypeOption
        label="More personalized"
        value="more"
        setValue={onChange}
        isSelected={value === "more"}
      />
    </div>
  );
}

function PortfolioTypeOption({ label, value, setValue, isSelected }) {
  return (
    <button
      className={`w-1/2 flex items-center justify-center h-[42px] rounded-[8px] py-[8px] text-grey-dark font-bold text-[18px] leading-[1.2] tracing-[-0.5px] transition-all duration-300 ${
        isSelected ? "bg-white dark:bg-grey-dark dark:text-yellow-dark" : "dark:text-white"
      }`}
      onClick={() => setValue(value)}
    >
      {label}
    </button>
  );
}
