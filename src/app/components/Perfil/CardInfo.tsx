import styles from "./perfil.module.scss";
import { ReactNode } from "react";

interface CardInfoProps {
  titulo: string;
  texto: string;
  link?: ReactNode;
}

export default function CardInfo({ titulo, texto, link  }: CardInfoProps) {
  return (
    <div className={styles.card}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2>{titulo} -</h2>
        <p>{texto}</p>
      </div>
      {link}
    </div>
  );
}
