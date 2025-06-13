import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { handleFetchError } from "@/utils/handleFetchError";
import {
  cadastrarTema,
  adicionarTema,
  atualizarTema,
  atualizarTemaProfessor,
  removerTema,
  adicionarEstudanteTema,
  removerEstudanteTema,
  TemaPayload,
} from "@/services/temaService";
import { TemaDTO } from "@/types";

export const useTemaActions = (usuario: any) => {
  const { setErro, setSucesso, setIsLoading } = useAlertaTemporarioContext();

  const handleCadastrarTema = async (e: React.FormEvent, dados: TemaPayload) => {
    try {
      setIsLoading(true);
      await cadastrarTema(e, usuario, dados);
      localStorage.setItem("mensagemSucesso", "Tema cadastrado com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAdicionarTema = async (dados: TemaDTO) => {
    try {
      setIsLoading(true);
      await adicionarTema(usuario, dados);
      localStorage.setItem("mensagemSucesso", "Tema adicionado com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAtualizarTema = async (e: React.FormEvent, dados: TemaPayload) => {
    try {
      setIsLoading(true);
      await atualizarTema(e, usuario, dados);
      localStorage.setItem("mensagemSucesso", "Tema atualizado com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAtualizarTemaProfessor = async (temaId: number, dados: TemaDTO) => {
    try {
      setIsLoading(true);
      await atualizarTemaProfessor(usuario, temaId, dados);
      setSucesso("Tema atualizado com sucesso!");
    } catch (error: any) {
      setErro(handleFetchError(error) || "Erro ao atualizar formação.");
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoverTema = async (temaId: number) => {
    try {
      setIsLoading(true);
      await removerTema(usuario, temaId);
      localStorage.setItem("mensagemSucesso", "Tema removido com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
    
  const handleRemoverTemaProfessor = async (temaId: number) => {
    try {
      setIsLoading(true);
      await removerTema(usuario, temaId);
      setSucesso("Tema removido com sucesso!");
    } catch (error: any) {
      setErro(handleFetchError(error) || "Erro ao remover formação.");
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdicionarEstudanteTema = async (e: React.FormEvent, matricula: string) => {
    try {
      setIsLoading(true);
      await adicionarEstudanteTema(e, usuario, matricula);
      localStorage.setItem("mensagemSucesso", "Estudante adicionado com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoverEstudanteTema = async (e: React.FormEvent, matricula: string) => {
    try {
      setIsLoading(true);
      await removerEstudanteTema(e, usuario, matricula);
      localStorage.setItem("mensagemSucesso", "Estudante removido com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCadastrarTema,
    handleAdicionarTema,
    handleAtualizarTema,
    handleAtualizarTemaProfessor,
    handleRemoverTema,
    handleRemoverTemaProfessor,
    handleAdicionarEstudanteTema,
    handleRemoverEstudanteTema,
  };
};
