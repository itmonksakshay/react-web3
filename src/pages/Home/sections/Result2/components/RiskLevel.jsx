export function RiskLevel({ value, bordered, className }) {
  const styles = [
    "border-[#8FE3BC] text-[#8FE3BC] bg-[rgba(116, 201, 150, 0.1)]",
    "border-[#F0B93A] text-[#F0B93A] bg-[rgba(227, 170, 24, 0.05)]",
    "border-[#E31818] text-[#E31818] bg-[rgba(227, 24, 24, 0.05)]",
  ];

  return (
    <div
      className={`flex items-center rounded-[2px] ${
        bordered ? "w-[20px] h-[20px] border-[1px] justify-center" : ""
      } ${
        value <= 2 ? styles[0] : value <= 4 ? styles[1] : styles[2]
      } ${className}`}
    >
      {value}
    </div>
  );
}
