import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { handleFetchError } from "@/utils/handleFetchError";
import { atualizarPerfil } from "@/services/perfilService";
import { useRouter } from "next/navigation";

export const usePerfilActions = (usuario: any) => {
  const router = useRouter();
  const identificadorAtual = usuario.role === "ESTUDANTE" ? usuario.matricula : usuario.idLattes;
  const { setErro, setSucesso, setIsLoading } = useAlertaTemporarioContext();

  const handleAtualizarPerfil = async (formData: any) => {
    try {
      setIsLoading(true);
      await atualizarPerfil(usuario, formData, identificadorAtual, router, setSucesso);
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleAtualizarPerfil,
  };
};
