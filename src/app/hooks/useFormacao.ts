import { useState } from 'react';

export const useFormacao = () => {
  const [id, setId] = useState(0);
  const [curso, setCurso] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [titulo, setTitulo] = useState("");
  const [anoInicio, setAnoInicio] = useState("");
  const [anoFim, setAnoFim] = useState("");
  
  return {
    id,
    setId,
    curso, 
    setCurso,
    instituicao, 
    setInstituicao,
    titulo,
    setTitulo,
    anoInicio, 
    setAnoInicio,
    anoFim, 
    setAnoFim,
  };
};