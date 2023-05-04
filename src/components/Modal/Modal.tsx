import { FC, ReactNode, useEffect, useRef } from "react";
import "./Modal.css";

export const Modal: FC<{ children: ReactNode; open: boolean; onClose: () => void }> = (
  props
): JSX.Element | null => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (
        !modalRef.current ||
        !modalRef.current.contains(event.target as Node) ||
        !contentRef.current ||
        contentRef.current.contains(event.target as Node)
      ) {
        return;
      }
      props.onClose();
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  if (props.open) {
    return (
      <div ref={modalRef} className="modal__wrapper">
        <div ref={contentRef} className="modal__content">
          {props.children}
        </div>
      </div>
    );
  }
  return null;
};
