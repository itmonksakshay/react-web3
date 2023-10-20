import { useState } from "react";
import Select from "react-select";
import { ReactComponent as DownArrowSvg } from "src/assets/img/icons/down-arrow.svg";
import { ReactComponent as UpArrowSvg } from "src/assets/img/icons/up-arrow.svg";
import { ReactComponent as CloseSvg } from "src/assets/img/icons/close.svg";
import { ChainLogo } from "../../ChainLogo";
import { chainOptions } from "src/constants/chainOptions";

export function ChainSelect({ selected, onChange, className }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuIsOpen(true);
  };

  const handleMenuClose = () => {
    setMenuIsOpen(false);
  };

  return (
    <Select
      isMulti
      options={chainOptions}
      value={selected}
      onChange={onChange}
      onMenuOpen={handleMenuOpen}
      onMenuClose={handleMenuClose}
      menuIsOpen={menuIsOpen}
      placeholder="Select option"
      components={{
        Control: ({ isFocused, children, getStyles, innerProps, ...props }) => {
          return (
            <div
              style={getStyles("control", props)}
              className={`!border-[1px] !rounded-[8px] ${
                isFocused
                  ? "!border-yellow-dark !bg-yellow-mild dark:!bg-[#21201E]"
                  : "!border-grey-lightest !bg-white dark:!border-grey-darker3 dark:!bg-grey-dark"
              }`}
              {...innerProps}
            >
              {children}
            </div>
          );
        },
        ValueContainer: ({ children, getStyles, innerProps, ...props }) => {
          return (
            <div
              style={getStyles("valueContainer", props)}
              className="!px-[8px] !py-[10px] !gap-[8px]"
              {...innerProps}
            >
              {children}
            </div>
          );
        },
        MultiValue: ({ data, innerProps, removeProps }) => {
          return (
            <div
              className={`flex gap-[8px] w-[191px] p-[8px] items-center text-[16px] leading-[1.1] font-medium text-grey-black dark:text-white rounded-[4px] border-[1px] ${
                data.value === "all"
                  ? "bg-yellow-mild border-yellow-dark dark:bg-transparent"
                  : "bg-grey-lighter4 border-grey-lightest dark:bg-grey-dark cursor-pointer hover:border-red-light hover:bg-red-mild dark:hover:bg-[#572929] transition-all duration-300"
              }`}
              {...removeProps}
              {...innerProps}
            >
              <ChainLogo chain={data.value} />
              {data.label}
              {data.value !== "all" && (
                <CloseSvg
                  className="ml-auto w-[8px] h-[8px] cursor-pointer stroke-grey-dark dark:stroke-white hover:stroke-red-light dark:hover:stroke-red-light transition-all duration-300"
                  {...removeProps}
                />
              )}
            </div>
          );
        },
        Option: ({ data, innerProps, isFocused }) => (
          <div
            className={`flex px-[8px] py-[4px] gap-[8px] items-center text-[16px] leading-[1.1] font-medium text-grey-black dark:text-white rounded-[4px] hover:bg-grey-lightest-20 cursor-pointer transition-all duration-300 ${
              isFocused ? "bg-grey-lightest-20" : ""
            }`}
            {...innerProps}
          >
            {data.value !== "all" && <ChainLogo chain={data.value} />}
            {data.label}
          </div>
        ),
        MenuList: ({ children, innerProps }) => (
          <div
            className="flex flex-col gap-[10px] p-[8px] rounded-[8px] bg-white dark:bg-grey-dark max-h-[188px] overflow-auto"
            {...innerProps}
          >
            {children}
          </div>
        ),
        Menu: ({ children, className, innerProps, getStyles, ...props }) => {
          return (
            <div
              className={`${className} animate-slideDown overflow-hidden dark:!bg-grey-dark`}
              {...innerProps}
              style={getStyles("menu", props)}
            >
              {children}
            </div>
          );
        },
        ClearIndicator: () => null,
        IndicatorSeparator: () => null,
        DropdownIndicator: () =>
          menuIsOpen ? (
            <UpArrowSvg className="mr-[12.5px] mt-[24.5px] self-baseline fill-grey-black dark:fill-grey-lightest" />
          ) : (
            <DownArrowSvg className="mr-[12.5px] mt-[24.5px] self-baseline fill-grey-black dark:fill-grey-lightest" />
          ),
      }}
      className={`z-[60] ${className}`}
    />
  );
}
