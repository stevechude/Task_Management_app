"use client";

import React, { useState, useEffect, useRef } from "react";

export const Modal = ({ show, onClose, children }) => {
  const [isOpen, setIsOpen] = useState(show);
  const modalRef = useRef(null);

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[1005] flex items-center justify-center overflow-hidden">
          <div
            style={{ backdropFilter: "blur(2px)" }}
            className="fixed inset-0 bg-[#575D7299]"
            onClick={handleClose}
          ></div>
          <div
            ref={modalRef}
            // className="p-3 z-20 md:w-[80%] xl:w-[65%] overflow-y-auto max-h-full scrollbar-hide flex justify-center"
            className="p-3 z-20 md:w-auto overflow-y-auto max-h-full scrollbar-hide"
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};
