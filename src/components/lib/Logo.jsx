import { ReactComponent as LogoSvg } from "src/assets/img/logo.svg";
import { ReactComponent as LogoSvg2 } from "src/assets/img/logo2.svg";
import { ModalType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";

export function Logo({ onClick, className, ...props }) {
  const { showModal } = useModal();

  const handelClick = () => {
    if (onClick) onClick();
    else {
      showModal(ModalType.RestartModal);
    }
  };
  return (
    <>
      <LogoSvg
        onClick={handelClick}
        className={`cursor-pointer dark:hidden ${className}`}
        {...props}
      />
      <LogoSvg2
        onClick={handelClick}
        className={`cursor-pointer hidden dark:block ${className}`}
        {...props}
      />
    </>
  );
}
