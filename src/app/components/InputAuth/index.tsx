import React from "react";
import styles from "./input.module.scss";

interface InputAuthProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name?: string;
  type: "text" | "email" | "password" | "date" | "tel" | "textarea" | "number";
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
}

export default function InputAuth({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  disabled = false,
  autoComplete,
  error,
  ...rest
}: InputAuthProps) {
  function handleNumberKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
      return;
    }

    if (
      !allowedKeys.includes(e.key) &&
      (isNaN(Number(e.key)) || e.key === ' ')
    ) {
      e.preventDefault();
    }
  }

  const commonProps = {
    name,
    placeholder,
    value,
    onChange,
    disabled,
    autoComplete,
    className: error ? styles.error_input : undefined,
    ...rest,
  };

  return (
    <div className={styles.input_field}>
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea
          {...(commonProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          maxLength={200}
        />
      ) : type === "number" ? (
        <input
          type={type}
          onKeyDown={handleNumberKeyDown}
          onPaste={(e) => {
            const pasted = e.clipboardData.getData('Text');
            if (!/^\d+$/.test(pasted)) {
              e.preventDefault();
            }
          }}
          {...commonProps}
        />
      ) : (
        <input
          type={type}
          {...commonProps}
        />
      )}
      {error && <span className={styles.error_text}>{error}</span>}
    </div>
  );
}
