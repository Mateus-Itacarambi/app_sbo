import styles from "./modalAreaInteresse.module.scss";

interface Props {
  texto: string;
  ativo: boolean;
  onClick: () => void;
}

export default function BadgeAreaInteresse({ texto, ativo, onClick }: Props) {
  return (
    <button
      className={`${styles.badge} ${ativo ? styles.ativo : ""}`}
      onClick={onClick}
    >
      {texto}
    </button>
  );
}
