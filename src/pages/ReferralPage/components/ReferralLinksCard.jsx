import { formatInTimeZone } from "date-fns-tz";

import { ReactComponent as ConfirmHexagonSvg } from "src/assets/img/icons/confirm-hexagon.svg";
import { ReactComponent as CopySVG } from "src/assets/img/icons/copy.svg";
import { ReactComponent as LockSVG } from "src/assets/img/icons/lock3.svg";
import { Toast } from "src/components/Toast";
import { useToast } from "src/contexts/ToastContext";
import { formatAddress } from "src/utils/helpers";

export function ReferralLinksCard({ data, className }) {
  const { showingToast, showToast } = useToast();

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    showToast();
  };

  return (
    <>
      <div
        className={`rounded-[8px] bg-grey-dark dark:bg-grey-darker3 p-[16px] flex flex-col gap-[16.5px] shadow-main ${className}`}
      >
        <div className="flex flex-col gap-[4px]">
          <h4 className="font-medium text-[20px] leading-[1.14] text-white">
            Referral Links
          </h4>
          <p className="font-normal text-[16px] leading-[1.2] tracking-[-0.5px] text-white">
            Share these with your friends and earn points
          </p>
        </div>
        <div className="flex flex-col gap-[14px]">
          {data.map((item) => (
            <div
              key={`${process.env.REACT_APP_ORIGIN}/invite/${item.referral_code}`}
              className="flex flex-col gap-[4px] lg:flex-row lg:justify-between lg:items-center"
            >
              <div
                className={`flex group ${
                  item.linked_address
                    ? "flex-col gap-[4px]"
                    : "items-center gap-[8px]"
                }`}
              >
                <p
                  className={`font-caption font-medium text-[12px] lg:text-[14px] leading-[1.2] tracking-[-0.5px] transition-all duration-300 ${
                    item.linked_address
                      ? "text-[14px] text-grey-deep"
                      : "text-yellow-dark group-hover:text-grey-deep"
                  }`}
                >
                  {`${process.env.REACT_APP_ORIGIN}/invite/${item.referral_code}`}
                </p>
                {item.linked_address ? (
                  <div className="flex gap-[16px] text-[12px] leading-[1.2] tracking-[-0.5px] text-grey-deep font-normal">
                    <p>
                      Claimed:{" "}
                      <span className="text-white">
                        {`${formatInTimeZone(new Date(item.claimed_at), "UTC", "dd MMM yyyy hh:mm:ss")} UTC`}
                      </span>
                    </p>
                    <p>
                      Linked Address:{" "}
                      <span className="text-white">
                        {formatAddress(item.linked_address)}
                      </span>
                    </p>
                  </div>
                ) : (
                  <CopySVG
                    onClick={() =>
                      handleCopy(
                        `${process.env.REACT_APP_ORIGIN}/invite/${item.referral_code}`
                      )
                    }
                    className="cursor-pointer ml-auto lg:ml-0 stroke-yellow-dark group-hover:stroke-grey-deep"
                  />
                )}
              </div>
              {item.linked_address ? (
                <div className="flex items-center gap-[8px] mt-[10px] lg:mt-0">
                  <p className="text-[12px] leading-[1.2] tracking-[-0.5px] font-normal text-grey-deep">
                    Rewarded:
                  </p>
                  <ClaimedTag reward={Math.floor(Math.random() * 900 + 100)} />
                </div>
              ) : (
                <UnclaimedTag />
              )}
            </div>
          ))}
        </div>
      </div>
      {showingToast && (
        <Toast
          title="Referral Link Copied"
          description="Share this link with someone who you wanna add to 1CC"
          IconSvg={ConfirmHexagonSvg}
          className="fixed left-1/2 bottom-[24px] -translate-x-1/2 lg:bottom-auto lg:translate-x-0 lg:top-[96px] lg:left-auto lg:right-[64px]"
        />
      )}
    </>
  );
}

function UnclaimedTag() {
  return (
    <div className="flex items-center rounded-[4px] border-[1px] border-green-lighter1 text-green-lighter1 p-[8px] text-[12px] h-[25px] w-fit">
      Unclaimed
    </div>
  );
}

function ClaimedTag({ reward = -1 }) {
  return (
    <div className="flex items-center gap-[2px] rounded-[4px] border-[1px] border-yellow-dark text-yellow-dark p-[8px] text-[12px] h-[25px] w-fit">
      <span>
        <span className="blur-[2.5px]">{reward}</span> points
      </span>
      <LockSVG />
    </div>
  );
}
