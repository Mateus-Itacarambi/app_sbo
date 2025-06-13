import styles from "../perfil.module.scss";
import { Tema, StatusTipo } from "@/types";
import ButtonAuth from "@/components/ButtonAuth";
import Dropdown from "../../Dropdown";
import Image from "next/image";
import Icone from "@/assets/tres-pontos.png";
import StatusBadge from "@/components/StatusBadge";
import { useState } from "react";
import { useSolicitacaoActions } from "@/hooks/useSolicitacaoActions";

interface CardTemaProps {
  temas?: Tema[] | null;
  onGerenciar: () => void;
  onAdicionarTema: () => void;
  mostrarBotoes: boolean;
  isLoading: boolean;
  atualizarTemas: () => void;
}

export default function CardTema({ temas, mostrarBotoes, onGerenciar, onAdicionarTema, isLoading, atualizarTemas }: CardTemaProps) {
  const [solicitados, setSolicitados] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const solicitacaoActions = useSolicitacaoActions();
  
  const solicitarTema = async (temaId: number) => {
    setLoading(true);
    try {
      await solicitacaoActions.handleSolicitarTema(temaId);
      setSolicitados(prev => new Set(prev).add(temaId));
      await atualizarTemas();
    } finally {
      setLoading(false);
    }
  };

  const cancelarSolicitacao = async (temaId: number, idSolicitacao: number) => {
    setLoading(true);
    try {
      await solicitacaoActions.handleCancelarOrientacao(idSolicitacao, "cancelar");
      setSolicitados(prev => {
        const novo = new Set(prev);
        novo.delete(temaId);
        return novo;
      });
      await atualizarTemas();
    } finally {
      setLoading(false);
    }
  };


  if (!temas || temas.length === 0) {
    return (
      <>
        <div className={styles.card_formacao}>
          <div className={styles.titulo}>
            <h2>Temas</h2>
          </div>
          <p>Não possui temas cadastradas.</p>
          {mostrarBotoes && (
            <ButtonAuth text="Adicionar Tema" type="button" theme="primary" margin="2rem 0 0 0" onClick={onAdicionarTema} loading={isLoading} />
          )}
        </div>
      </>
    );
  }

  return (
    <div className={styles.card_temas}>
      <div className={styles.titulo}>
        <h2>Temas</h2>
        {mostrarBotoes && (
          <Dropdown
            label=""
            width="17rem"
            top="2rem"
            icon={<div className={styles.icon}><Image src={Icone} alt=""/></div>}
            items={[
              { type: "link", label: "", href: "" },
              { type: "action", label: "Adicionar Tema", onClick: onAdicionarTema },
              { type: "action", label: "Gerenciar Temas", onClick: onGerenciar },
            ]}
          />
        )}
      </div>

      <ul className={styles.lista_temas}>
        {temas
          ?.slice()
          .sort((a, b) => a.titulo.localeCompare(b.titulo))
          .map((tema, idx) => {
            const estaSolicitado = solicitados.has(tema.id);
            return (
              <li key={idx} className={styles.tema}>
                <div className={styles.tema_content}>
                  <div className={styles.title}>
                    {tema.titulo}
                    {tema.statusTema === "DISPONIVEL" && !mostrarBotoes && (
                      <ButtonAuth
                        text={estaSolicitado ? "Cancelar" : "Solicitar"}
                        type="button"
                        theme={"primary"}
                        margin="0"
                        onClick={() => {
                          if (!estaSolicitado) {
                            solicitarTema(tema.id);
                          } else {
                            cancelarSolicitacao(tema.id, tema.idSolicitacao!);
                          }
                        }}
                        loading={loading}
                        className={estaSolicitado ? styles.cancelar : styles.solicitar}
                      />
                    )}
                  </div>
                  <StatusBadge status={tema.statusTema as StatusTipo} />
                  <div className={styles.keywords}>{tema.palavrasChave}</div>
                  {(tema.estudantes ?? []).length > 0 && (
                    <div className={styles.description}>
                      {(tema.estudantes ?? [])
                        .map(e => e.nome)
                        .sort((a, b) => a.localeCompare(b))
                        .join(', ')}
                    </div>
                  )}
                  <div className={styles.description}>{tema.descricao}</div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
