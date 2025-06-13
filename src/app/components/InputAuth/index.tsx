import React from "react";
import styles from "./input.module.scss";

interface InputAuthProps {
  label: string;
  name?: string;
  type: "text" | "email" | "password" | "date" | "tel" | "textarea" | "number";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

export default function InputAuth({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  disabled = false,
}: InputAuthProps) {
  function handleNumberKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
    if (
      !allowedKeys.includes(e.key) &&
      (isNaN(Number(e.key)) || e.key === ' ')
    ) {
      e.preventDefault();
    }
  }

  return (
    <div className={styles.input_field}>
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={styles.textarea}
          maxLength={200}
        />
      ) : type === "number" ? (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onKeyDown={handleNumberKeyDown}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    </div>
  );
}
