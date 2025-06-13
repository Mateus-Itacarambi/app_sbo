import { useRef, useState } from "react";
import styles from "./inputTags.module.scss";
import { Plus, Minus, X, Search } from "lucide-react";
import CustomBadge from "../CustomBadge";

interface Props {
  label: string;
  palavras: string[];
  setPalavras: (palavras: string[]) => void;
}

export default function InputPalavrasChaveTags({ label, palavras, setPalavras }: Props) {
  const [entrada, setEntrada] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [erroEntrada, setErroEntrada] = useState("");

  const MAX_SEM_ESPACO = 24;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const ultimaPalavra = valor.split(" ").pop() || "";

    if (ultimaPalavra.length > MAX_SEM_ESPACO) {
      setErroEntrada(`Máximo de ${MAX_SEM_ESPACO} caracteres sem espaço.`);
      return;
    }

    setErroEntrada("");
    setEntrada(valor);
  };


  const adicionarPalavra = () => {
    const nova = entrada.trim();
    if (nova && !palavras.includes(nova)) {
      setPalavras([...palavras, nova]);
    }
    setEntrada("");
  };

  const removerPalavra = (palavra: string) => {
    setPalavras(palavras.filter((p) => p !== palavra));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      adicionarPalavra();
      setErroEntrada("");
    }
  };

  return (
    <div className={`${styles.container} ${isOpen ? styles.aberto : ""}`} ref={ref}>
      <div className={styles.labelRow} onClick={() => setIsOpen(!isOpen)}>
        <span>{label}</span>
        <button>{isOpen ? <Minus className={styles.icone} /> : <Plus className={styles.icone} />}</button>
      </div>
      {isOpen && (
      <div className={styles.dropdownMenu}>
        <div className={styles.inputComIcone}>
          <input
            type="text"
            placeholder="Digite e pressione Enter ou Vírgula"
            value={entrada}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          {entrada ? (
            <X className={styles.icone} onClick={() => setEntrada("")} />
          ) : (
            <Search className={styles.icone} />
          )}
        </div>
        
        {erroEntrada && <p className={styles.erro}>{erroEntrada}</p>}

        <ul className={styles.lista_palavrasChave}>
          {palavras.map((palavra) => (
            <li key={palavra} className={styles.tag}>
              <CustomBadge 
                palavraChave={palavra}
                style={"palavraChave"} 
                mostrarBotao={true}
                onRemoverPalavraChave={() => removerPalavra(palavra)}
                />
            </li>
          ))}
        </ul>
      </div>
      )}
    </div>
  );
}
