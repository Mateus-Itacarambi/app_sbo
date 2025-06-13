import { Professor } from "@/types";
import styles from "./professoresPage.module.scss";
import ButtonAuth from "../ButtonAuth";
import Link from "next/link";
import { SquareArrowOutUpRight } from 'lucide-react';
import ProfessorProfile from "../UsuarioProfile";
import { useEffect, useState } from "react";

interface ProfessorCardProps {
  professor: Professor;
  desabilitarSolicitacao?: boolean;
  solicitacaoJaFeita?: boolean;
  onSolicitar?: () => Promise<void>;
  onCancelar?: () => Promise<void>;
}

export default function ProfessorCard({ professor, desabilitarSolicitacao, solicitacaoJaFeita, onSolicitar, onCancelar }: ProfessorCardProps) {
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
    <div className={styles.card_professor}>
      <ProfessorProfile usuario={professor} />

      <div className={styles.info}>
        <h3>{professor.nome}</h3>
        <p className={styles.email}>{professor.email}</p>
        {(professor.areasDeInteresse && professor.areasDeInteresse.length > 0) && (
          <p className={styles.areas}>
            <strong>Áreas de Interesse:</strong> 
            {professor.areasDeInteresse.map(a => a.nome).join(", ")}
          </p>
        )}
        {(professor.cursos && professor.cursos.length > 0) && (
          <p className={styles.cursos}>
            <strong>Cursos:</strong> 
            {professor.cursos.map(a => a.nome).join(", ")}
          </p>
        )}
        <p className={styles.lattes}>
          <strong>Lattes:</strong> 
          <Link href={`https://lattes.cnpq.br/${professor.idLattes}`} target="_blank" >
            https://lattes.cnpq.br/{professor.idLattes}
            <SquareArrowOutUpRight size={"14px"} strokeWidth={"2px"} className={styles.icone} />
          </Link>
        </p>
      
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
          <Link href={`/perfil/${professor.idLattes}`} target="_blank" >
            <ButtonAuth text={"Visualizar Perfil"} type="button" theme="primary_2" margin="0" loading={loading} />
          </Link>
          <ButtonAuth
            text={solicitado ? "Cancelar Solicitação" : "Solicitar Orientação"}
            type="button"
            theme={solicitado ? "secondary" : "primary"}
            margin="0"
            disabled={desabilitarSolicitacao || loading}
            onClick={handleClick}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
