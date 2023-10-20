import { useLayoutEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/fonts";
import { Home } from "./pages/Home";
import { InvitationPage } from "./pages/InvitationPage";
import { JoinPage } from "./pages/JoinPage";
import { ReferralPage } from "./pages/ReferralPage";
import { PoolPage } from "./pages/PoolPage";
import { SolanaBridgePage } from "./pages/SolanaBridgePage";
import { LiFiWidget } from "@lifi/widget";

export default function App() {
  useLayoutEffect(() => {
    if (localStorage.getItem("dark")) {
      document.getElementsByTagName("html")[0].className = "dark";
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ai-scanner" element={<Home isWalletAnalysisMode />} />
      <Route path="/demo" element={<Home isDemo />} />
      <Route path="/airdrop" element={<ReferralPage />} />
      <Route path="/invite/:referralCode" element={<InvitationPage />} />
      <Route path="/pool/:poolId" element={<PoolPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/solana-bridge" element={<SolanaBridgePage />} />
      <Route path="/swap/*" element={<SolanaBridgePage />} />
    </Routes>
  );
}
