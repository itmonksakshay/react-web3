import { useState } from "react";
import { JoinModal, ThanksModal } from "src/components/modals";

export function JoinPage() {
  const [joined, setJoined] = useState(false);

  const handleSuccess = () => {
    setJoined(true);
  };

  return joined ? <ThanksModal isJoinPage /> : <JoinModal onSuccess={handleSuccess} />;
}
