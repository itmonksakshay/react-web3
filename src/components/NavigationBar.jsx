import { Link, useLocation, useNavigate } from "react-router-dom";
import { ModalType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";
// import { isMobileDevice, openNewTab } from "src/utils/helpers";

export function NavigationBar({ className }) {
  const { showModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (
      location.pathname === "/airdrop" ||
      location.pathname === "/invitation" ||
      location.pathname === "/swap"
    )
      navigate("/");
    else showModal(ModalType.RestartModal);
  };
  const handleWalletScanClick = (e) => {
    e.preventDefault();
    if (
      location.pathname === "/airdrop" ||
      location.pathname === "/invitation" ||
      location.pathname === "/swap"
    )
      navigate("/ai-scanner");
    else showModal(ModalType.WalletAnalyzeModal);
  };
  // const showJoinModal = () => {
  //   if (isMobileDevice()) openNewTab("/join");
  //   else showModal(ModalType.JoinModal);
  // };

  return (
    <ul
      className={`flex gap-[42px] items-center justify-between lg:justify-start ${className}`}
    >
      <li className="font-body text-[16px] leading-[1.1] font-medium text-grey-black dark:text-white hover:text-yellow-dark transition-all">
        <Link onClick={handleHomeClick}>Home</Link>
      </li>
      <li className="font-body text-[16px] leading-[1.1] font-medium text-grey-black dark:text-white hover:text-yellow-dark transition-all">
        <Link onClick={handleWalletScanClick}>AI Wallet Scan</Link>
      </li>
      <li className="font-body text-[16px] leading-[1.1] font-medium text-grey-black dark:text-white hover:text-yellow-dark transition-all">
        <Link to={"/swap"}>Bridge</Link>
      </li>
      <li className="font-body text-[16px] leading-[1.1] font-medium text-grey-black dark:text-white hover:text-yellow-dark transition-all">
        <Link to={"/airdrop"}>Airdrop</Link>
      </li>
      {/* <li className="font-body text-[16px] leading-[1.1] font-medium text-grey-deep hover:text-yellow-dark transition-all">
        <Link className="flex items-center gap-[8px]" onClick={showJoinModal}>
          Airdrop
          <span className="mt-[3px] text-[6px] leading-[1.3] font-black uppercase text-yellow-darker border-[0.5px] border-yellow-darker w-[28px] h-[10px] flex justify-center items-center rounded-[2px]">
            soon
          </span>
        </Link>
      </li> */}
    </ul>
  );
}
