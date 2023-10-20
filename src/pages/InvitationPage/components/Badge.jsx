export function Badge({ logo, title, featured }) {
  return (
    <div className="flex gap-[11.83px] items-center rounded-[9px] border-[1px] p-[8px] text-red-lighter3 border-red-lighter3">
      {logo}
      <div>
        <p className="font-helvetica text-[7.1px] leading-[8.16px] font-bold">{title}</p>
        <p className="font-helvetica text-[16.56px] leading-[19.04px] font-bold">{featured}</p>
      </div>
    </div>
  );
}
