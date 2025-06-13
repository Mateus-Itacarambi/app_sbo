import Paginacao from "@/components/Paginacao";
import ProfessorCard from "./ProfessorCard";
import { Professor } from "@/types";
import styles from "./professoresPage.module.scss";
import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSolicitacaoActions } from "@/hooks/useSolicitacaoActions";

interface ListaProfessoresProps {
  professores: Professor[];
  paginaAtual: number;
  totalPaginas: number;
  onPaginaChange: (p: number) => void;
  atualizarProfessores: () => void;
}

export default function ListaProfessores({ professores, paginaAtual, totalPaginas, onPaginaChange, atualizarProfessores }: ListaProfessoresProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { usuario } = useAuth();
  const solicitacaoActions = useSolicitacaoActions();

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [paginaAtual]);
  
  const solicitarOrientacao = async (professorId: number) => {
    await solicitacaoActions.handleSolicitarOrientacao(professorId);
    await atualizarProfessores();
  };
  
  const cancelarSolicitacao = async (idSolicitacao: number) => {
    await solicitacaoActions.handleCancelarOrientacao(idSolicitacao, "cancelar");
    await atualizarProfessores();
  };

  return (
    <section className={styles.lista_professores}>
      <h2>Consultar Professores</h2>

      <div className={styles.professores_container} ref={containerRef}>
        <div className={styles.professores}>
          {professores.map((p) => (
            <ProfessorCard 
              key={p.id} 
              professor={p}
              desabilitarSolicitacao={usuario?.role !== "ESTUDANTE"}
              solicitacaoJaFeita={p.solicitacaoPendente}
              onSolicitar={() => solicitarOrientacao(p.id)}
              onCancelar={() => cancelarSolicitacao(p.idSolicitacao!)}
             />
          ))}
        </div>
      
        <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onPaginaChange={onPaginaChange}
        />
      </div>
    </section>
  );
}
