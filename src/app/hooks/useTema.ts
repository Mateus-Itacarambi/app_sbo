import { useState } from 'react';

export const useTema = () => {
  const [temaTitulo, setTemaTitulo] = useState("");
  const [temaDescricao, setTemaDescricao] = useState("");
  const [temaPalavrasChave, setTemaPalavrasChave] = useState("");
  
  return {
    temaTitulo,
    setTemaTitulo,
    temaDescricao,
    setTemaDescricao,
    temaPalavrasChave,
    setTemaPalavrasChave
  };
};