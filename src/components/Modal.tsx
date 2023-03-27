import React, { FC, PropsWithChildren } from "react";
import ReactDOM from "react-dom";

const Modal: FC<
  PropsWithChildren & {
    open: boolean;
    onClose: () => void;
  }
> = ({ children, open, onClose }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          zIndex: 999,
        }}
        onClick={(e) => {
          onClose();
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          width: "90%",
          height: "90%",
          overflow: "auto",
        }}
      >
        {children}
      </div>
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
