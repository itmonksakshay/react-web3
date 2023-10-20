export function Link({ children, className, href, id, target = "_blank" }) {
  return (
    <a
      href={href}
      target={target}
      id={id}
      className={`text-grey-lighter hover:text-grey-black dark:text-grey-deep dark:hover:text-white text-[12px] leading-[1.25] font-body font-normal underline transition-all duration-300 ${className}`}
    >
      {children}
    </a>
  );
}
