import { Estudante } from "./estudante";
import { Professor } from "./professor";

export interface Tema {
    id: number;
    titulo: string;
    descricao: string;
    palavrasChave: string;
    statusTema: string;
    professor: Professor;
    estudantes?: Estudante[];
    solicitacaoPendente?: boolean;
    idSolicitacao?: number;
}
  
export interface TemaDTO {
    titulo: string;
    descricao: string;
    palavrasChave: string;
}
  
export interface TemaSolicitacao {
    id: number;
    titulo: string;
    descricao: string;
    palavrasChave: string;
    estudantes?: Estudante[];
}