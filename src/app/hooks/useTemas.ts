import { useState } from "react";
import { Tema } from "@/types";

export function useTemas() {
  const [temas, setTemas] = useState<Tema[]>([]);

  const professorTema: any = {
    id: 0,
    nome: "",
  };

  const [temaAtual, setTemaAtual] = useState<Tema | null>(null);
  
  const [formularioEdicao, setFormularioEdicao] = useState<Tema>({
    id: 0,
    titulo: "",
    descricao: "",
    palavrasChave: "",
    statusTema: "",
    professor: professorTema,
    estudantes: []
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleEditar = (index: number) => {
    setTemaAtual(temas[index]);
    setEditIndex(index);
  };

  return {
    temas,
    setTemas,
    temaAtual,
    setTemaAtual,
    formularioEdicao, 
    setFormularioEdicao,
    editIndex,
    handleEditar,
  };
}
