import React from "react";
import styles from "./alerta.module.scss";

interface AlertaProps {
  text: string;
  theme: string;
  top?: string;
  onClick?: () => void;

}

export default function Alerta({ text, theme, top="2rem" }: AlertaProps) {
  return (
    <div className={`${styles.mensagem} ${styles[theme]}` } style={{ top: top }}>
      {text}
    </div>
  );
}
