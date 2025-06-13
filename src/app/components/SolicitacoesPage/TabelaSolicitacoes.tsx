import { Solicitacao, tipoMap } from "@/types/solicitacao";
import styles from "./solicitacoesPage.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import { useSolicitacaoActions } from "@/hooks/useSolicitacaoActions";
import { X, Search, Eye, EyeOff } from "lucide-react";
import SelectAuth from "@/components/SelectAuth";
import Link from "next/link";
import React, { useRef, useState } from "react";
import StatusBadge from "../StatusBadge";
import { StatusTipo } from "@/types";
import ModalCancelarSolicitacao from "../Modal/ModalCancelarSolicitacao";
import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";

interface TabelaSolicitacoesProps {
  solicitacoes: Solicitacao[];
  mostrarFiltros: boolean;
  filtros: any;
  setFiltros: (f: any) => void;
  atualizarSolicitacoes: () => Promise<void>;
}

export default function TabelaSolicitacoes({ solicitacoes, mostrarFiltros, filtros, setFiltros, atualizarSolicitacoes }: TabelaSolicitacoesProps) {
  const { isLoading } = useAlertaTemporarioContext();
  const [modalCancelarSolicitacao, setModalCancelarSolicitacao] = useState(false);
  const [modalRejeitarSolicitacao, setModalRejeitarSolicitacao] = useState(false);
  const [solicitacaoIdSelecionada, setSolicitacaoIdSelecionada] = useState<number | null>(null);
  const [loading, setLoading] = useState<{ id: number; tipo: "APROVAR" | "REJEITAR" | "CANCELAR" | "CONCLUIR" } | null>(null);
  const { usuario } = useAuth();
  const solicitacaoActions = useSolicitacaoActions();
  const [motivoAberto, setMotivoAberto] = useState<number[]>([]);

  const cancelarOrientacao = async (solicitacaoId: number, motivo: string) => {
    setLoading({ id: solicitacaoId, tipo: "CANCELAR" });
    try {
      await solicitacaoActions.handleCancelarOrientacao(solicitacaoId, motivo);
      await atualizarSolicitacoes();
    } catch (error) {
      console.error("Erro ao cancelar orientação:", error);
    } finally {
      setLoading(null);
    }
  };

  const aprovarOrientacao = async (solicitacaoId: number) => {
    setLoading({ id: solicitacaoId, tipo: "APROVAR" });
    try {
      await solicitacaoActions.handleAprovarSolicitacao(solicitacaoId);
      await atualizarSolicitacoes();
    } catch (error) {
      console.error("Erro ao aprovar orientação:", error);
    } finally {
      setLoading(null);
    }
  };

  const rejeitarOrientacao = async (solicitacaoId: number, motivo: string) => {
    setLoading({ id: solicitacaoId, tipo: "REJEITAR" });
    try {
      await solicitacaoActions.handleRejeitarSolicitacao(solicitacaoId, motivo);
      await atualizarSolicitacoes();
    } catch (error) {
      console.error("Erro ao rejeitar orientação:", error);
    } finally {
      setLoading(null);
    }
  };

  const concluirOrientacao = async (solicitacaoId: number) => {
    setLoading({ id: solicitacaoId, tipo: "CONCLUIR" });
    try {
      await solicitacaoActions.handleConcluirSolicitacao(solicitacaoId);
      await atualizarSolicitacoes();
    } catch (error) {
      console.error("Erro ao concluir orientação:", error);
    } finally {
      setLoading(null);
    }
  };

  const toggleMotivo = (id: number) => {
    setMotivoAberto((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleTodosMotivos = () => {
    if (motivoAberto.length > 0) {
      setMotivoAberto([]);
    } else {
      const todosIds = solicitacoes.map((s) => s.id);
      setMotivoAberto(todosIds);
    }
  };


  const statusOptions = [
    { value: "", label: "Todos" },
    { value: "PENDENTE", label: "Pendente" },
    { value: "APROVADA", label: "Aprovada" },
    { value: "REJEITADA", label: "Rejeitada" },
    { value: "CANCELADA", label: "Cancelada" },
    { value: "CONCLUIDA", label: "Concluída" },
  ];

  const tipoOptions = [
    { value: "", label: "Todos" },
    { value: "TEMA", label: "Tema" },
    { value: "ORIENTACAO", label: "Orientação" },
  ];

  const limparCampoNome = () => {
    setFiltros({ ...filtros, nomeEstudante: "", nomeProfessor: "" });
  };

  const limparCampoTema = () => {
    setFiltros({ ...filtros, tituloTema: "" });
  };

  return (
    <>
      <table className={styles.tabela}>
        <thead>
          <tr>
            {usuario?.role === "PROFESSOR" ? (
              <th>Estudante</th>
            ) : (
              <th>Professor</th>
            )}
            <th>Tema</th>
            <th>Status</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
            {mostrarFiltros && (
              <tr className={styles.filtros}>
                <td>
                  {usuario?.role === "PROFESSOR" ? (
                    <div className={styles.inputComIcone}>
                      <input
                        name="nomeEstudante"
                        placeholder="Filtrar nome"
                        value={filtros.nomeEstudante}
                        onChange={(e) => setFiltros({ ...filtros, nomeEstudante: e.target.value })}
                      />
                      {filtros.nomeEstudante ? (
                        <X className={styles.icone} onClick={limparCampoNome} />
                      ) : (
                        <Search className={styles.icone} />
                      )}
                    </div>
                  ) : (
                    <div className={styles.inputComIcone}>
                      <input
                        name="nomeProfessor"
                        placeholder="Filtrar nome"
                        value={filtros.nomeProfessor}
                        onChange={(e) => setFiltros({ ...filtros, nomeProfessor: e.target.value })}
                      />
                      {filtros.nomeProfessor ? (
                        <X className={styles.icone} onClick={limparCampoNome} />
                      ) : (
                        <Search className={styles.icone} />
                      )}
                    </div>
                  )}
                </td>
                <td>
                  <div className={styles.inputComIcone}>
                    <input
                      name="tema"
                      placeholder="Filtrar tema"
                      value={filtros.tituloTema}
                      onChange={(e) => setFiltros({ ...filtros, tituloTema: e.target.value })}
                    />
                    {filtros.tituloTema ? (
                      <X className={styles.icone} onClick={limparCampoTema} />
                    ) : (
                      <Search className={styles.icone} />
                    )}
                  </div>
                </td>
                <td>
                  <SelectAuth
                    options={statusOptions}
                    onChange={(status) => setFiltros({ ...filtros, status })}
                    name="status"
                    height="auto"
                    padding=".6rem 1rem"
                    margin="0"
                    fontSize="1.4rem"
                  />
                </td>
                <td>
                  <SelectAuth
                    options={tipoOptions}
                    onChange={(tipo) => setFiltros({ ...filtros, tipo })}
                    name="tipo"
                    height="auto"
                    padding=".6rem 1rem"
                    margin="0"
                    fontSize="1.4rem"
                  />
                </td>
                <td>
                  <button onClick={toggleTodosMotivos} className={styles.botaoMostrarTodos}>
                    {motivoAberto.length > 0 ? (
                        <>
                          <EyeOff size={"14px"} strokeWidth={"2px"}/>
                          Ocultar Tudo
                        </>
                      ) : (
                        <>
                          <Eye size={"14px"} strokeWidth={"2px"}/>
                          Mostrar Tudo
                        </>
                      )}
                  </button>
                </td>
              </tr>
            )}
        </thead>
        <tbody>
          {solicitacoes.map((s) => (
            <React.Fragment key={s.id}>
              <tr key={s.id}>
                <td>
                  {usuario?.role === "PROFESSOR" ? (
                    <Link href={`/perfil/${s.estudante?.slug}`} target="_blank">
                      {s.estudante?.nome}
                    </Link>
                  ) : (
                    <Link href={`/perfil/${s.professor?.slug}`} target="_blank">
                      {s.professor?.nome}
                    </Link>
                  )}
                </td>
                <td>{s.tema?.titulo}</td>
                <td>
                  <StatusBadge status={s.status as StatusTipo} />
                </td>
                <td>{tipoMap[s.tipo]}</td>
                <td style={{ width: "100%", display: "flex", gap: "1rem", justifyContent: "center" }}>
                  {s.status === "PENDENTE" ? (
                    usuario?.role === "PROFESSOR" ? (
                      <>
                        <button title="Aprovar" className={styles.aprovar} onClick={() => aprovarOrientacao(s.id)} disabled={loading?.id === s.id}>
                          {loading?.id === s.id && loading?.tipo === "APROVAR"
                            ? <span className={styles.spinner}></span>
                            : "Aprovar"}
                        </button>
                        <button title="Rejeitar" className={styles.rejeitar} onClick={() => { setSolicitacaoIdSelecionada(s.id); setModalRejeitarSolicitacao(true); }} >
                          {loading?.id === s.id && loading?.tipo === "REJEITAR"
                            ? <span className={styles.spinner}></span>
                            : "Rejeitar"}
                        </button>
                      </>
                    ) : (
                      <>
                        <button title="Cancelar" className={styles.rejeitar} onClick={() => { cancelarOrientacao(s.id, "cancelar"); }}>Cancelar</button>
                      </>
                    )
                  ) : s.status === "APROVADA" ? (
                    usuario?.role === "PROFESSOR" ? (
                      <>
                        <button title="Concluir" className={styles.aprovar} onClick={() => concluirOrientacao(s.id)} disabled={loading?.id === s.id}>
                          {loading?.id === s.id && loading?.tipo === "CONCLUIR"
                            ? <span className={styles.spinner}></span>
                            : "Concluir"}
                        </button>
                        <button title="Cancelar" className={styles.rejeitar} onClick={() => { setSolicitacaoIdSelecionada(s.id); setModalCancelarSolicitacao(true)}}>Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button title="Cancelar" className={styles.rejeitar} onClick={() => { setSolicitacaoIdSelecionada(s.id); setModalCancelarSolicitacao(true)}}>Cancelar</button>
                      </>
                    )
                  ) : (
                    <button title="Mostrar/Ocultar Motivo" className={styles.ver} onClick={() => toggleMotivo(s.id)}>
                      {motivoAberto.includes(s.id) ? (
                        <>
                          <EyeOff size={"14px"} strokeWidth={"3px"}/>
                          Ocultar Motivo
                        </>
                      ) : (
                        <>
                          <Eye size={"14px"} strokeWidth={"3px"}/>
                          Mostrar Motivo
                        </>
                      )}
                    </button>
                  )}
                </td>
              </tr>
              {motivoAberto.includes(s.id) && s.motivo && (
                <tr>
                  <td colSpan={5} style={{ padding: "1rem 0" }}>
                    <div className={styles.motivo}>
                      <strong>Motivo:</strong> {s.motivo}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {(modalCancelarSolicitacao || modalRejeitarSolicitacao) && (
        <ModalCancelarSolicitacao
          titulo={modalCancelarSolicitacao ? "Cancelar Solicitação" : "Rejeitar Solicitação"}
          onClose={() => {
            setModalCancelarSolicitacao(false);
            setModalRejeitarSolicitacao(false);
            setSolicitacaoIdSelecionada(null);
          }}
          onSubmit={modalCancelarSolicitacao ? cancelarOrientacao : rejeitarOrientacao}
          isLoading={isLoading}
          textoBotao="Concluir"
          idSolicitacao={solicitacaoIdSelecionada}
        />
      )}
    </>
  );
}
