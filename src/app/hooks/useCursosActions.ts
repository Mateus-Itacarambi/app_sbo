import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { handleFetchError } from "@/utils/handleFetchError";
import { AreaInteresse, CursoProfessor } from "@/types";

import {
  adicionarCursos,
  removerCurso
} from "@/services/cursoService";


export const useCursosActions = (usuario: any) => {
  const { setErro, setSucesso, setIsLoading } = useAlertaTemporarioContext();

  const handleAdicionarCurso = async (dados: CursoProfessor[]) => {
    try {
      setIsLoading(true);
      await adicionarCursos(usuario, dados);
      localStorage.setItem("mensagemSucesso", "Cursos adicionados com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
    
const handleRemoverCurso = async (cursoId: number) => {
    try {
    setIsLoading(true);
    await removerCurso(usuario, cursoId);
    setSucesso("Curso removido com sucesso!");
    } catch (error: any) {
    setErro(handleFetchError(error) || "Erro ao remover Curso.");
    setSucesso("");
      throw error;
    } finally {
    setIsLoading(false);
    }
};

  return {
    handleAdicionarCurso,
    handleRemoverCurso
  };
};