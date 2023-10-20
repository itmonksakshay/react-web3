import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ToastContext = createContext();
ToastContext.displayName = "Toast Context";

function ToastProvider({ children }) {
  const [showingToast, setShowingToast] = useState(false);

  const showToast = useCallback(() => {
    setShowingToast(true);
  }, []);

  const closeToast = useCallback(() => {
    setShowingToast(false);
  }, []);

  const value = useMemo(
    () => ({
      showingToast,
      showToast,
      closeToast,
    }),
    [showingToast, showToast, closeToast]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

const useToast = () => {
  const value = useContext(ToastContext);
  if (!value)
    throw new Error("useToast hook must be used within ToastProvider");
  return value;
};

export { useToast, ToastProvider };
