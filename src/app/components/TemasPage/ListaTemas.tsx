import Paginacao from "@/components/Paginacao";
import TemaCard from "./TemaCard";
import { Tema } from "@/types";
import styles from "./temasPage.module.scss";
import { useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSolicitacaoActions } from "@/hooks/useSolicitacaoActions";

interface ListaTemasProps {
  temas: Tema[];
  paginaAtual: number;
  totalPaginas: number;
  onPaginaChange: (p: number) => void;
  atualizarTemas: () => void;
  isLoading: boolean;
}

export default function ListaTemas({ temas, paginaAtual, totalPaginas, onPaginaChange, atualizarTemas, isLoading }: ListaTemasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { usuario } = useAuth();
  const solicitacaoActions = useSolicitacaoActions();

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [paginaAtual]);
  
  const solicitarTema = async (temaId: number) => {
    await solicitacaoActions.handleSolicitarTema(temaId);
    await atualizarTemas();
  };
  
  const cancelarSolicitacao = async (idSolicitacao: number) => {
    await solicitacaoActions.handleCancelarOrientacao(idSolicitacao, "cancelar");
    await atualizarTemas();
  };

  return (
    <section className={styles.lista_temas}>
      <h2>Consultar Temas</h2>
      
      <div className={styles.temas_container} ref={containerRef}>
        <div className={styles.temas}>
          {temas.map((t) => (
            <TemaCard 
              key={t.id} 
              tema={t}
              desabilitarSolicitacao={usuario?.role !== "ESTUDANTE"}
              solicitacaoJaFeita={t.solicitacaoPendente}
              onSolicitar={() => solicitarTema(t.id)}
              onCancelar={() => cancelarSolicitacao(t.idSolicitacao!)}
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
