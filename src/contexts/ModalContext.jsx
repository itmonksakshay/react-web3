import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ModalType } from "../constants/enums";

const ModalContext = createContext();
ModalContext.displayName = "Modal Context";

function ModalProvider({ children }) {
  const [modalType, setModalType] = useState(ModalType.None);

  const showModal = setModalType;

  const closeModal = useCallback(() => {
    setModalType(ModalType.None);
  }, []);

  const value = useMemo(
    () => ({
      modalType,
      showModal,
      closeModal,
    }),
    [modalType, showModal, closeModal]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

const useModal = () => {
  const value = useContext(ModalContext);
  if (!value)
    throw new Error("useModal hook must be used within ModalProvider");
  return value;
};

export { useModal, ModalProvider };

