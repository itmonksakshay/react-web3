import { Turnstile } from "@marsidev/react-turnstile";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const TurnstileContext = createContext();
TurnstileContext.displayName = "Turnstile Context";

function TurnstileProvider({ children }) {
  const [token, setToken] = useState(false);
  const [verified, setVerified] = useState(false);

  const retry = useCallback(() => {
    setVerified(false);
  }, []);

  const handleVerify = useCallback((token) => {
    setToken(token);
    setVerified(true);
  }, []);

  const value = useMemo(
    () => ({
      verified,
      token,
      retry,
    }),
    [retry, token, verified]
  );

  return (
    <TurnstileContext.Provider value={value}>
      {verified ? (
        children
      ) : (
        <Turnstile
          siteKey={process.env.REACT_APP_TURNSTILE_SITEKEY}
          onSuccess={handleVerify}
        />
      )}
    </TurnstileContext.Provider>
  );
}

const useTurnstile = () => {
  const value = useContext(TurnstileContext);
  if (!value)
    throw new Error("useTurnstile hook must be used within TurnstileProvider");
  return value;
};

export { TurnstileProvider, useTurnstile };
