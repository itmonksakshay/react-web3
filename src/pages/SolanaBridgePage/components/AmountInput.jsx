import * as Loader from "react-spinners";

export function AmountInput({
  value,
  setValue,
  isLoading,
  className,
  ...props
}) {
  const handleChange = (e) => {
    setValue?.(e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="number"
        placeholder={isLoading ? "" : "Amount"}
        value={isLoading ? "" : value}
        onChange={handleChange}
        className={`border-grey-lightest border-[1px] rounded-[8px] px-[8px] text-normal text-[14px] leading-[15px] text-grey-black w-full h-full`}
        {...props}
      />
      {isLoading && (
        <Loader.MoonLoader
          color="black"
          size={24}
          className="!absolute left-[8px] top-[13px]"
        />
      )}
    </div>
  );
}
