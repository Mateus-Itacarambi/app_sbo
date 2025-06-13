import { useState } from "react";
import { Formacao } from "@/types";

export function useFormacoes() {
  const [formacoes, setFormacoes] = useState<Formacao[]>([]);
  const [formacaoAtual, setFormacaoAtual] = useState<Formacao | null>(null);
  const [formularioEdicao, setFormularioEdicao] = useState<Formacao>({
    id: 0,
    curso: "",
    instituicao: "",
    titulo: "",
    anoInicio: new Date().getFullYear(),
    anoFim: new Date().getFullYear()
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleEditar = (index: number) => {
    setFormacaoAtual(formacoes[index]);
    setEditIndex(index);
  };

  return {
    formacoes,
    setFormacoes,
    formacaoAtual,
    setFormacaoAtual,
    formularioEdicao, 
    setFormularioEdicao,
    editIndex,
    handleEditar,
  };
}
