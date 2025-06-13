import { useEffect, useRef, useState } from "react";
import styles from "./customSelect.module.scss";
import { ChevronDown } from 'lucide-react';

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps {
  name: string;
  text?: string;
  options: Option[];
  disabled?: boolean;
  placeholder?: string;
  selected?: string | number;
  onChange: (value: string) => void;
  height?: string;
  padding?: string;
  margin?: string;
  fontSize?: string;
}

export default function CustomSelect({
  name,
  text,
  options,
  disabled = false,
  placeholder = "Selecione uma opção",
  selected,
  onChange,
  height,
  padding,
  margin,
  fontSize
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected !== undefined && selected !== null) {
      setSelectedValue(String(selected));
    }
  }, [selected]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  const selectedLabel = options.find((opt) => String(opt.value) === selectedValue)?.label;
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.container_select}>
      {text && <label className={styles.label}>{text}</label>}

      <div className={`${styles.select_wrapper} ${isOpen ? styles.aberto : ""} ${disabled ? styles.disabled : ""}`}  ref={containerRef} style={{ height: height, margin: margin, fontSize: fontSize }}>

        <input
          type="hidden"
          name={name}
          value={selectedValue}
        />

        <div
          className={`${styles.select_display} ${disabled ? styles.disabled : ""}`}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          tabIndex={0}
          style={{ padding: padding}}
        >
          {selectedLabel || <span className={styles.placeholder}>{placeholder}</span>}

          <ChevronDown className={styles.icone} />
        </div>
        
        {isOpen && (
          <div className={`${styles.options_list} ${isOpen ? styles.aberto : ""}`}>
            {options.map((option) => (
              <div
                key={option.value}
                className={styles.option_item}
                onClick={() => handleSelect(String(option.value))}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
