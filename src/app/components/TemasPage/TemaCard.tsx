import { Tema } from "@/types";
import styles from "./temasPage.module.scss";
import ButtonAuth from "../ButtonAuth";
import { useEffect, useState } from "react";

interface TemaCardProps {
  tema: Tema;
  desabilitarSolicitacao?: boolean;
  solicitacaoJaFeita?: boolean;
  onSolicitar?: () => Promise<void>;
  onCancelar?: () => Promise<void>;
}

export default function TemaCard({ tema, desabilitarSolicitacao, solicitacaoJaFeita, onSolicitar, onCancelar }: TemaCardProps) {
  const [solicitado, setSolicitado] = useState(solicitacaoJaFeita);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSolicitado(solicitacaoJaFeita);
  }, [solicitacaoJaFeita]);

  const handleClick = async () => {
    setLoading(true);
    try {
      if (!solicitado) {
        await onSolicitar?.();
        setSolicitado(true);
      } else {
        await onCancelar?.();
        setSolicitado(false);
      }
    } catch (e) {
      console.error("Erro ao processar solicitação:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card_tema}>
      <h3>{tema.titulo}</h3>

      <p className={styles.info}>
        <strong>Palavras-chave:</strong> 
        {tema.palavrasChave}
      </p>

      <p className={styles.info}>
        <strong>Descrição:</strong> 
        {tema.descricao}
      </p>

      <p className={styles.info}>
        <strong>Orientador:</strong> 
        {tema.professor.nome}
      </p>

      <ButtonAuth
        text={solicitado ? "Cancelar Solicitação" : "Solicitar Tema"}
        type="button"
        theme={solicitado ? "secondary" : "primary"}
        margin="0"
        disabled={desabilitarSolicitacao || loading}
        onClick={handleClick}
        loading={loading}
      />
    </div>
  );
}
