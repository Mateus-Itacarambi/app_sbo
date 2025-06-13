import { ProfessorCurso } from "./professor";

export interface Curso {
    id: number;
    nome: string;
    sigla: string;
    descricao: string;
    semestres: number;
    slug: string;
    cargaHoraria: string;
    duracaoMax: string;
    modalidade: string;
    professores: ProfessorCurso[];
}

export interface CursoProfessor {
    id: number;
    nome: string;
    slug: string;
}