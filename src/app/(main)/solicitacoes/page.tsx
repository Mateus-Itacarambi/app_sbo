"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./solicitacoes.module.scss";
import { Solicitacao } from "@/types";
import Paginacao from "../../components/Paginacao";
import TabelaSolicitacoes from "@/components/SolicitacoesPage/TabelaSolicitacoes";
import Alerta from "@/components/Alerta";
import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { useWebSocketSolicitacoes } from "@/hooks/useWebSocketSolicitacoes";
import { useAuth } from "@/contexts/AuthContext";

interface Page<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export default function SolicitacoesPage() {
  const { usuario } = useAuth();
  const { erro, sucesso, mostrarAlerta } = useAlertaTemporarioContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [filtros, setFiltros] = useState({
    status: [] as string[],
    tipo: [] as string[],
    tituloTema: "",
    nomeProfessor: "",
    nomeEstudante: ""
  });

  useEffect(() => {
    buscarSolicitacoes();
  }, [paginaAtual, filtros]);

  const buscarSolicitacoes = async () => {
    const params = new URLSearchParams();
    params.append("page", paginaAtual.toString());
    params.append("size", "10");
    params.append("sort", "dataSolicitacao,desc");

    Object.entries(filtros).forEach(([chave, valor]) => {
      if (typeof valor === "string" && valor.trim() !== "") {
        params.append(chave, valor);
      }
      if (Array.isArray(valor) && valor.length > 0) {
        valor.forEach((v) => params.append(chave, v));
      }
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/solicitacoes?${params}`, {
      method: "GET",
      credentials: "include",
    });
    const data: Page<Solicitacao> = await res.json();

    setSolicitacoes(data.content);
    setTotalPaginas(data.page.totalPages);
  };

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [paginaAtual]);

  useWebSocketSolicitacoes({
    userId: usuario?.id || 0,
    onNovaSolicitacao: (nova) => {
      setSolicitacoes((prev) => {
        const existe = prev.some((s) => s.id === nova.id);
        return existe
          ? prev.map((s) => (s.id === nova.id ? nova : s))
          : [nova, ...prev];
      });
    },
    onRemoverSolicitacao: (id) => {
      setSolicitacoes((prev) => prev.filter((s) => s.id !== id));
    },
  });

  return (
    <div className={styles.main}>
      {mostrarAlerta && (
        <Alerta text={erro || sucesso} theme={erro ? "erro" : "sucesso"} top="10rem" />
      )}
      <div className={styles.container}>
        <div className={styles.card_container}>
          <div className={styles.head}>
            <h1>Solicitações de Orientação/Tema</h1>

            <button
              className={`${styles.filtros_button} ${mostrarFiltros ? styles.hidden : ""}`}
              onClick={() => setMostrarFiltros((prev) => !prev)}
            >
              {mostrarFiltros ? "Ocultar Filtros" : "Mostrar Filtros"}
            </button>
          </div>
          <TabelaSolicitacoes
            solicitacoes={solicitacoes}
            mostrarFiltros={mostrarFiltros}
            filtros={filtros}
            setFiltros={setFiltros}
            atualizarSolicitacoes={buscarSolicitacoes}
          />
          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onPaginaChange={setPaginaAtual}
            boxShadow={false}
            padding="0"
          />
        </div>
      </div>
    </div>
  );
}
