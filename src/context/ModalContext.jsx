
"use client";
import { createContext, useContext, useState } from "react";

const ModalCtx = createContext(null);

export function ModalProvider({ children }) {
  const [state, setState] = useState({ open: false, payload: {} });
  const openModal = (payload = {}) => {
    setState({ open: true, payload });
    document.documentElement.style.overflow = "hidden";
  };
  const closeModal = () => {
    setState({ open: false, payload: {} });
    document.documentElement.style.overflow = "";
  };
  return (
    <ModalCtx.Provider value={{ ...state, openModal, closeModal }}>
      {children}
    </ModalCtx.Provider>
  );
}

export const useModal = () => {
  const v = useContext(ModalCtx);
  if (!v) throw new Error("useModal must be used inside ModalProvider");
  return v;
}
