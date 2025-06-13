"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type AlertaContextType = {
  erro: string;
  sucesso: string;
  mostrarAlerta: boolean;
  isLoading: boolean;
  setErro: (msg: string) => void;
  setSucesso: (msg: string) => void;
  setMostrarAlerta: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
};

const AlertaContext = createContext<AlertaContextType | undefined>(undefined);

export const AlertaProvider = ({ children }: { children: ReactNode }) => {
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

  return (
    <AlertaContext.Provider
      value={{
        erro,
        sucesso,
        mostrarAlerta,
        isLoading,
        setErro,
        setSucesso,
        setMostrarAlerta,
        setIsLoading,
      }}
    >
      {children}
    </AlertaContext.Provider>
  );
};

export const useAlertaTemporarioContext = () => {
  const context = useContext(AlertaContext);
  if (!context) {
    throw new Error("useAlertaTemporarioContext deve ser usado dentro de AlertaProvider");
  }
  return context;
};
