import { useState, useEffect } from 'react';

export function useAlertaTemporario() {
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sucessoStorage = localStorage.getItem("mensagemSucesso");
    const erroStorage = localStorage.getItem("mensagemErro");

    if (sucessoStorage) {
      setSucesso(sucessoStorage);
      localStorage.removeItem("mensagemSucesso");
    }

    if (erroStorage) {
      setErro(erroStorage);
      localStorage.removeItem("mensagemErro");
    }
  }, []);

  useEffect(() => {
    if (erro || sucesso) {
      setMostrarAlerta(true);
      const timer = setTimeout(() => {
        setMostrarAlerta(false);
        setErro('');
        setSucesso('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [erro, sucesso]);

  return {
    erro,
    sucesso,
    mostrarAlerta,
    isLoading,
    setErro,
    setSucesso,
    setMostrarAlerta,
    setIsLoading
  };
}