import { useState } from "react";
import { AreaInteresse } from "@/types";

export function useAreasInteresse() {
  const [areasInteresse, setAreasInteresse] = useState<AreaInteresse[]>([]);

  const [areaInteresseAtual, setAreaInteresseAtual] = useState<AreaInteresse>({
    id: 0,
    nome: ""
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleEditar = (index: number) => {
    setAreaInteresseAtual(areasInteresse[index]);
    setEditIndex(index);
  };

  return {
    areasInteresse,
    setAreasInteresse,
    areaInteresseAtual,
    setAreaInteresseAtual,
    editIndex,
    handleEditar,
  };
}
