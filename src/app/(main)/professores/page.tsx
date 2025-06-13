"use client";

import { useEffect, useState } from "react";
import { Professor } from "@/types";
import FiltroProfessor from "@/components/ProfessoresPage/FiltroProfessor";
import ListaProfessores from "@/components/ProfessoresPage/ListaProfessores";
import styles from "./professores.module.scss";
import Alerta from "@/components/Alerta";
import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";

interface Page<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export default function ProfessoresPage() {
  const { erro, sucesso, isLoading, mostrarAlerta} = useAlertaTemporarioContext();
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [filtros, setFiltros] = useState({
    nome: "",
    curso:  [] as string[],
    disponibilidade: [] as string[],
    areaInteresse: [] as string[]
  });

  useEffect(() => {
    buscarProfessores();
  }, [paginaAtual, filtros]);
  
  const buscarProfessores = async () => {
    const params = new URLSearchParams();

    params.append("page", paginaAtual.toString());
    params.append("size", "10");
    params.append("sort", "nome");

    Object.entries(filtros).forEach(([chave, valor]) => {
      if (typeof valor === "string" && valor.trim() !== "") {
        params.append(chave, valor);
      }
      if (Array.isArray(valor) && valor.length > 0) {
        valor.forEach((v) => params.append(chave, v));
      }
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/professores?${params}`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Erro ao buscar professores");

    const data: Page<Professor> = await res.json();
    if (!data.page) throw new Error("Formato inesperado de resposta");

    setProfessores(data.content);
    setTotalPaginas(data.page.totalPages);
  };

  const atualizarProfessores = async () => {
    try {
      await buscarProfessores();
    } catch (e) {
      console.error("Erro ao atualizar professores:", e);
    }
  };

  return (
    <div className={styles.main}>
      {mostrarAlerta && (
        <Alerta text={erro || sucesso} theme={erro ? "erro" : "sucesso"} top="10rem" />
      )}
        <div className={styles.container}>
            <FiltroProfessor filtros={filtros} setFiltros={setFiltros} isLoading={isLoading} />
            <ListaProfessores 
                professores={professores}
                paginaAtual={paginaAtual}
                totalPaginas={totalPaginas}
                onPaginaChange={setPaginaAtual}
                atualizarProfessores={atualizarProfessores}
             />
        </div>
    </div>
  );
}
