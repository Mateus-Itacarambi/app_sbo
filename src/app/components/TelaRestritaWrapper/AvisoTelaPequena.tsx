"use client";

import { useEffect, useState } from "react";
import styles from "./avisoTelaPequena.module.scss";

export default function AvisoTelaPequena() {
  const [telaPequena, setTelaPequena] = useState(false);

  useEffect(() => {
    const verificarTamanho = () => {
      setTelaPequena(window.innerWidth < 1400);
    };

    verificarTamanho();
    window.addEventListener("resize", verificarTamanho);

    return () => window.removeEventListener("resize", verificarTamanho);
  }, []);

  if (!telaPequena) return null;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Sistema indisponível para dispositivos móveis</h1>
        <p>
          Por enquanto, o sistema está disponível apenas para acesso em
          notebooks ou computadores.
        </p>
        <p>
          Por favor, utilize um dispositivo com tela maior para continuar.
        </p>
      </div>
    </div>
  );
}
