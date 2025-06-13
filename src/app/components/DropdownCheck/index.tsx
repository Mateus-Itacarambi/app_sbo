import { useState, useRef, useEffect } from "react";
import styles from "./dropdownCheck.module.scss";
import { Plus, Minus, X, Search } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  search?: boolean;
}

export default function DropdownCheck({ label, options, selectedValues, onChange, search=true }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [buscaArea, setBuscaArea] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(buscaArea.toLowerCase())
  );
  
  return (
    <div className={`${styles.dropdownContainer} ${isOpen ? styles.aberto : ""}`} ref={ref}>
      <div className={styles.labelRow} onClick={() => setIsOpen(!isOpen)}>
        <span>{label}</span>
        <button>{isOpen ? <Minus className={styles.icone} /> : <Plus className={styles.icone} />}</button>
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {search && (
            <div className={styles.inputComIcone}>
              <input
                type="text"
                placeholder="Buscar..."
                value={buscaArea}
                onChange={(e) => setBuscaArea(e.target.value)}
              />
              {buscaArea ? (
                <X className={styles.icone} onClick={() => setBuscaArea("")} />
              ) : (
                <Search className={styles.icone} />
              )}
            </div>
          )}
          <div className={styles.optionsList}>
            {filteredOptions.map((opt) => (
              <label key={opt.value} className={styles.optionItem}>
                <input
                  type="checkbox"
                  checked={selectedValues.includes(opt.value)}
                  onChange={() => toggleOption(opt.value)}
                />
                <span>
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
