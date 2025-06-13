import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { handleFetchError } from "@/utils/handleFetchError";
import { AreaInteresse } from "@/types";

import {
  adicionarAreasInteresse,
  removerAreaInteresse
} from "@/services/areaInteresseService";


export const useAreaInteresseActions = (usuario: any) => {
  const { setErro, setSucesso, setIsLoading } = useAlertaTemporarioContext();

  const handleAdicionarAreasInteresse = async (dados: AreaInteresse[]) => {
    try {
      setIsLoading(true);
      await adicionarAreasInteresse(usuario, dados);
      localStorage.setItem("mensagemSucesso", "Áreas de Interesse adicionadas com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
    
const handleRemoverAreaInteresse = async (areaInteresseId: number) => {
    try {
    setIsLoading(true);
    await removerAreaInteresse(usuario, areaInteresseId);
    setSucesso("Área de Interesse removida com sucesso!");
    } catch (error: any) {
    setErro(handleFetchError(error) || "Erro ao remover Área de Interesse.");
    setSucesso("");
      throw error;
    } finally {
    setIsLoading(false);
    }
};

  return {
    handleAdicionarAreasInteresse,
    handleRemoverAreaInteresse
  };
};