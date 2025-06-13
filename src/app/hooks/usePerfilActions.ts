import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { handleFetchError } from "@/utils/handleFetchError";
import { atualizarPerfil } from "@/services/perfilService";
import { useRouter } from "next/navigation";

export const usePerfilActions = (usuario: any, formData: any) => {
  const router = useRouter();
  const identificadorAtual = usuario.role === "ESTUDANTE" ? usuario.matricula : usuario.idLattes;
  const { setErro, setSucesso, setIsLoading } = useAlertaTemporarioContext();

  const handleAtualizarPerfil = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      await atualizarPerfil(e, usuario, formData, identificadorAtual, router, setSucesso);
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
