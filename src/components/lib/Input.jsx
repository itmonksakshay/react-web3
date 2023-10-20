export function Input({ className, ...props }) {
  return (
    <input
      className={`w-full h-[55px] text-grey-black font-normal text-[14px] leading-[1.1] px-[8.5px] rounded-[8px] border-[1px] border-grey-lightest focus:border-yellow-dark focus-visible:outline-none ${className}`}
      style={{
        boxShadow: "2px 23px 36px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(7px)",
      }}
      {...props}
    />
  );
}
