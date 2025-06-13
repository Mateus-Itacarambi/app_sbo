import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { handleFetchError } from "@/utils/handleFetchError";

import {
  solicitarOrientacao,
  solicitarTema,
  cancelarOrientacao,
  rejeitarSolicitacao,
  aprovarSolicitacao,
  concluirSolicitacao,
} from "@/services/solicitacaoService";


export const useSolicitacaoActions = () => {
  const { setErro, setSucesso, setIsLoading } = useAlertaTemporarioContext();

  const handleSolicitarOrientacao = async (professorId: number) => {
    try {
      setIsLoading(true);
      await solicitarOrientacao(professorId);
      setSucesso("Solicitacão enviada com sucesso!");
      setErro("");
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSolicitarTema = async (temaId: number) => {
    try {
      setIsLoading(true);
      await solicitarTema(temaId);
      setSucesso("Solicitacão enviada com sucesso!");
      setErro("");
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAprovarSolicitacao = async (solicitacaoId: number) => {
    try {
      setIsLoading(true);
      await aprovarSolicitacao(solicitacaoId);
      setSucesso("Solicitacão aprovada com sucesso!");
      setErro("");
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejeitarSolicitacao = async (solicitacaoId: number, motivo: string) => {
    try {
      setIsLoading(true);
      await rejeitarSolicitacao(solicitacaoId, motivo);
      setSucesso("Solicitacão rejeitada com sucesso!");
      setErro("");
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleConcluirSolicitacao = async (solicitacaoId: number) => {
    try {
      setIsLoading(true);
      await concluirSolicitacao(solicitacaoId);
      setSucesso("Solicitacão concluída com sucesso!");
      setErro("");
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelarOrientacao = async (solicitacaoId: number, motivo: string) => {
    try {
      setIsLoading(true);
      await cancelarOrientacao(solicitacaoId, motivo);
      setSucesso("Solicitacão cancelada com sucesso!");
      setErro("");
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    handleSolicitarOrientacao,
    handleSolicitarTema,
    handleAprovarSolicitacao,
    handleRejeitarSolicitacao,
    handleConcluirSolicitacao,
    handleCancelarOrientacao,
  };
};
