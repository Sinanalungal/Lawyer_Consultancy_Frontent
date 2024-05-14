import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalStyle: React.CSSProperties = {
    display: isOpen ? "flex" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    background:'rgba(0, 0, 0, 0.9)',
    paddingTop: '15px', 
    paddingBottom: '15px', 
    overflowY:"scroll",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1000,
  };

  // const modalContentStyle: React.CSSProperties = {
  //   backgroundColor: "#fff",
  //   margin: "auto",
  //   padding: 20,
  //   width: "50%",
  //   borderRadius: 8,
  //   boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
  // };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div className="m-auto w-[98%] sm:w-[70%] md:w-[60%] lg:w-[50%] rounded-md shadow-md" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
