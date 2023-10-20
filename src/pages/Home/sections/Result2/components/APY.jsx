export function APY({ value, className }) {
  // const styles = [
  //   "border-[#A7A7A7] text-[#A7A7A7] bg-[rgba(167, 167, 167, 0.05)]",
  //   "border-[#8FE3BC] text-[#8FE3BC] bg-[rgba(116, 201, 150, 0.1)]",
  // ];

  // const numValue = Number(value.split("%")[0]);

  return (
    <div
      className={`h-[20px] px-[5px] flex items-center justify-center rounded-[2px] border-[1px] border-[#A7A7A7] text-[#A7A7A7] bg-[rgba(167, 167, 167, 0.05)] ${className}`}
    >
      {value}
    </div>
  );
}
