import axios from "axios";
import { useState } from "react";
import { ModalType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";
import * as Sentry from "@sentry/react";

export function useJoinWaitlist() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { showModal } = useModal();

  const joinWaitlist = ({
    email,
    discordUsername,
    discordId,
    discordEmail,
    walletAddress,
    referralCode,
    onSuccess,
  }) => {
    setIsLoading(true);
    setError("");
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/waitlist/join`, {
        email,
        discord_username: discordUsername,
        discord_id: discordId,
        discord_email: discordEmail,
        wallet_address: walletAddress,
        referral_code: referralCode,
      })
      .then((response) => {
        setIsLoading(false);
        showModal(ModalType.ThanksModal);
        onSuccess?.();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setError(`${error.response.data.message}`);
        Sentry.captureException(error);
      });
  };

  return { joinWaitlist, isLoading, error };
}
