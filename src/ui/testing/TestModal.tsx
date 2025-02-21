import React, { cloneElement, ReactElement, ReactNode, useState } from "react";
import { TestModalContext, useTestModalContext } from "./TestModalContext";
import { createPortal } from "react-dom";
import { useTestClickOutside } from "./useTestClickOutside";

const TestModal = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = setIsOpen;

    return (
        <TestModalContext.Provider value={{ isOpen, toggleModal }}>
            <div>{children}</div>
        </TestModalContext.Provider>
    );
};

TestModal.Toggle = function TestModalToggle({
    children,
}: {
    children: ReactNode;
}) {
    const { isOpen, toggleModal } = useTestModalContext();

    const toggleContent = cloneElement(children as ReactElement, {
        onClick: (e: React.MouseEvent) => {
            e.stopPropagation();
            toggleModal?.(true);
        },
    });

    return isOpen
        ? null
        : createPortal(
              <div
                  style={{
                      position: "absolute",
                      top: "10rem",
                      left: "40vw",
                      transform: "translate(-50%, 0)",
                  }}
                  onClick={() => console.log("wrapping div clicked")}
              >
                  {toggleContent}
              </div>,
              document.body
          );
};

TestModal.Window = function TestModalWindow({
    children,
}: {
    children: ReactNode;
}) {
    const { isOpen, toggleModal } = useTestModalContext();

    const ref = useTestClickOutside(() => {
        console.log("outside click");
        toggleModal?.(false);
    });
    return isOpen
        ? createPortal(
              <div
                  ref={ref}
                  style={{
                      width: "600px",
                      height: "300px",
                      padding: "16px",
                      backgroundColor: "aqua",
                      position: "absolute",
                      top: "20rem",
                      left: "50vw",
                      transform: "translate(-50%, 0)",
                      zIndex: "10000",
                      borderRadius: "8px",
                  }}
              >
                  <div
                      style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "1rem",
                      }}
                  >
                      <h1>This is modal header</h1>
                      <button
                          style={{
                              borderRadius: "8px",
                              padding: "3px",
                              width: "4rem",
                              height: "4rem",
                          }}
                          onClick={() => toggleModal?.(false)}
                      >
                          ✖️
                      </button>
                  </div>
                  <hr />
                  {children}
              </div>,
              document.body
          )
        : null;
};

export default TestModal;
