"use client";

import { useEffect, useState } from "react";
import { Tema } from "@/types";
import FiltroTemas from "@/components/TemasPage/FiltroTemas";
import ListaTemas from "@/components/TemasPage/ListaTemas";
import styles from "./temas.module.scss";
import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import Alerta from "@/components/Alerta";

interface Page<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export default function TemasPage() {
  const { erro, sucesso, isLoading, mostrarAlerta} = useAlertaTemporarioContext();
  const [temas, setTemas] = useState<Tema[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [filtros, setFiltros] = useState({
    titulo: "",
    palavrasChave: [] as string[],
    professor: [] as string[]
  });

  useEffect(() => {
    buscarTemas();
  }, [paginaAtual, filtros]);
  
  const buscarTemas = async () => {
    const params = new URLSearchParams();

    params.append("page", paginaAtual.toString());
    params.append("size", "10");
    params.append("sort", "titulo");

    Object.entries(filtros).forEach(([chave, valor]) => {
      if (typeof valor === "string" && valor.trim() !== "") {
        params.append(chave, valor);
      }
      if (Array.isArray(valor) && valor.length > 0) {
        valor.forEach((v) => params.append(chave, v));
      }

      filtros.palavrasChave.forEach(palavra => params.append("palavrasChave", palavra));
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/temas?${params}`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Erro ao buscar temas");

    const data: Page<Tema> = await res.json();
    if (!data.page) throw new Error("Formato inesperado de resposta");

    setTemas(data.content);
    setTotalPaginas(data.page.totalPages);
  };

  const atualizarTemas = async () => {
    try {
      await buscarTemas();
    } catch (e) {
      console.error("Erro ao atualizar temas:", e);
    }
  };

  return (
    <div className={styles.main}>
      {mostrarAlerta && (
        <Alerta text={erro || sucesso} theme={erro ? "erro" : "sucesso"} top="10rem" />
      )}
      <div className={styles.container}>
          <FiltroTemas filtros={filtros} setFiltros={setFiltros} isLoading={isLoading} />
          <ListaTemas 
              temas={temas}
              paginaAtual={paginaAtual}
              totalPaginas={totalPaginas}
              onPaginaChange={setPaginaAtual}
              isLoading={isLoading}
              atualizarTemas={atualizarTemas}
          />
      </div>
    </div>
  );
}
