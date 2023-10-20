export function ExploreCard({
  title,
  description,
  link,
  onLinkClick,
  image,
  image2,
  className,
}) {
  const handleClick = (e) => {
    if (!onLinkClick) return;
    e.preventDefault();
    onLinkClick?.();
  };

  return (
    <div
      className={`relative rounded-[8px] bg-white dark:bg-grey-dark p-[16px] h-[345px] lg:h-auto shadow-main overflow-hidden ${className}`}
    >
      <div className="flex flex-col gap-[4px]">
        <h4 className="font-medium text-[20px] leading-[1.14] text-grey-dark dark:text-white">
          {title}
        </h4>
        <p className="font-normal text-[16px] leading-[1.2] tracking-[-0.5px] min-h-[77px] max-w-[328px] dark:text-white">
          {description}
        </p>
        <a
          href={link}
          target={"_blank"}
          rel="noreferrer"
          onClick={handleClick}
          className="font-caption text-[14px] leading-[1.2] text-yellow-main cursor-pointer hover:text-yellow-deep transition-all duration-300"
        >
          Explore
        </a>
      </div>
      <img
        src={image}
        alt="information"
        className="dark:hidden absolute w-[340px] object-cover border-[0.9px] border-yellow-light rounded-[11px] shadow-xl rotate-[-5.52deg] top-[165px] lg:top-[15px] right-[-20px] lg:right-[-78px]"
      />
      <img
        src={image2}
        alt="information"
        className="hidden dark:block absolute w-[340px] object-cover border-[0.9px] border-yellow-light rounded-[11px] shadow-xl rotate-[-5.52deg] top-[165px] lg:top-[15px] right-[-20px] lg:right-[-78px]"
      />
    </div>
  );
}
