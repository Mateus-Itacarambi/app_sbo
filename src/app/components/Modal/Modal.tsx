import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.scss";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  minHeight?: string;
}

export default function Modal({ onClose, children, minHeight }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ minHeight: minHeight }}>
        {children}
      </div>
    </div>,
    document.body
  );
}
