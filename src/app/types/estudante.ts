import { Usuario } from "./usuario";
import { Curso } from "./curso";
import { Tema } from "./tema";

export interface Estudante extends Usuario {
  matricula: string;
  semestre: number;
  curso?: Curso | null;
  tema?: Tema | null;
}