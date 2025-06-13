import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { handleFetchError } from "@/utils/handleFetchError";
import { FormacaoDTO } from "@/types";

import {
  adicionarFormacao,
  atualizarFormacao,
  removerFormacao,
} from "@/services/formacaoService";


export const useFormacaoActions = (usuario: any) => {
  const { setErro, setSucesso, setIsLoading } = useAlertaTemporarioContext();

  const handleAdicionarFormacao = async (dados: FormacaoDTO) => {
    try {
      setIsLoading(true);
      await adicionarFormacao(usuario, dados);
      localStorage.setItem("mensagemSucesso", "Formação cadastrado com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAtualizarFormacao = async (formacaoId: number, dados: FormacaoDTO) => {
    try {
      setIsLoading(true);
      await atualizarFormacao(usuario, formacaoId, dados);
      setSucesso("Formação atualizada com sucesso!");
    } catch (error: any) {
      setErro(handleFetchError(error) || "Erro ao atualizar formação.");
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRemoverFormacao = async (formacaoId: number) => {
    try {
      setIsLoading(true);
      await removerFormacao(usuario, formacaoId);
      setSucesso("Formação removida com sucesso!");
    } catch (error: any) {
      setErro(handleFetchError(error) || "Erro ao remover formação.");
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleAdicionarFormacao,
    handleAtualizarFormacao,
    handleRemoverFormacao,
  };
};
