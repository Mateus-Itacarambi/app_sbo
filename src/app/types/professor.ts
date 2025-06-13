import { Usuario, Curso, Tema, AreaInteresse, Formacao } from "./index";

export interface Professor extends Usuario {
  idLattes: string;
  disponibilidade: string;
  cursos?: Curso[] | null;
  areasDeInteresse?: AreaInteresse[] | null;
  formacoes?: Formacao[] | null;
  temas?: Tema[] | null;
  solicitacaoPendente?: boolean;
  idSolicitacao?: number;
}

export interface ProfessorCurso {
  id: number;
  nome: string;
  email: string;
  disponibilidade: string;
  idLattes: string;
}