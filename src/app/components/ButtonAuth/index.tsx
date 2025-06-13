import React from "react";
import styles from "./button.module.scss";

interface ButtonAuthProps {
  text: React.ReactNode;
  type: "button" | "submit" | "reset";
  theme: string;
  onClick?: () => void;
  disabled?: boolean;
  margin?: string;
  icon?: boolean;
  loading: boolean;
  className?: string;
}

export default function ButtonAuth({ text, type, onClick, theme, disabled = false, margin, icon = false, loading, className }: ButtonAuthProps) {
  return (
    <>
      {!icon ? (
        <button 
          className={`${styles.button} ${styles[theme]} ${className ?? ""}`}
          onClick={onClick}
          type={type}
          disabled={loading || disabled}
          style={{ margin }}
        >
          {loading ? <span className={styles.spinner}></span> : text}
        </button>
      ) : (
        <button
          className={`${styles.button} ${styles[theme]} ${className ?? ""}`}
          onClick={onClick}
          type={type}
          disabled={loading || disabled}
          style={{ margin, width: "0", height: "0", backgroundColor: "white" }}
        >
          {loading ? <span className={styles.spinner}></span> : text}
        </button>
      )}
    </>
  );
}

