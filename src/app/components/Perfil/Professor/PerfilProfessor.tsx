import CardInfo from "../CardInfo";
import CardTema from "../Professor/CardTema";
import CardAreaInteresse from "../Professor/CardAreaInteresse";

import { Professor, Formacao, Tema, AreaInteresse, Curso, CursoProfessor } from "@/types";
import { FC } from "react";
import CardFormacao from "./CardFormacao";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import CardCurso from "./CardCurso";

interface PerfilProfessorProps {
  professor: Professor;
  onGerenciarFormacao: () => void;
  onGerenciarTemas: () => void;
  onAdicionarFormacao: () => void;
  onAdicionarAreaInteresse: () => void;
  onAdicionarTema: () => void;
  onAdicionarCurso: () => void;
  isMeuPerfil: boolean;
  formacoes?: Formacao[];
  temas?: Tema[];
  areasInteresse?: AreaInteresse[];
  cursos?: CursoProfessor[];
  onRemoverAreaInteresse: (areaInteresseId: number) => void;
  onRemoverCurso: (cursoId: number) => void;
  isLoading: boolean;
}

const PerfilProfessor: FC<PerfilProfessorProps> = ({
  professor,
  onGerenciarFormacao,
  onGerenciarTemas,
  onAdicionarFormacao,
  onAdicionarAreaInteresse,
  onAdicionarTema,
  onAdicionarCurso,
  isMeuPerfil,
  formacoes,
  temas,
  areasInteresse,
  cursos,
  onRemoverAreaInteresse,
  onRemoverCurso,
  isLoading,
}) => (
  <>
    <CardInfo titulo="ID Lattes" texto={professor.idLattes} link={<Link href={`https://lattes.cnpq.br/${professor.idLattes}`} target="_blank"><SquareArrowOutUpRight color="#669966" /></Link>} />

    <CardFormacao 
      formacoes={formacoes} 
      onGerenciar={onGerenciarFormacao}
      onAdicionarFormacao={onAdicionarFormacao}
      mostrarBotoes={isMeuPerfil}
      isLoading={isLoading}
    />

    <CardAreaInteresse
      areasInteresse={areasInteresse}
      onAdicionarArea={onAdicionarAreaInteresse}
      mostrarBotoes={isMeuPerfil}
      onRemoverAreaInteresse={onRemoverAreaInteresse}
      isLoading={isLoading}
    />

    <CardTema
      temas={temas} 
      onGerenciar={onGerenciarTemas}
      onAdicionarTema={onAdicionarTema}
      mostrarBotoes={isMeuPerfil} 
      isLoading={isLoading}
    />

    <CardCurso
      cursos={cursos}
      onAdicionarCurso={onAdicionarCurso}
      onRemoverCurso={onRemoverCurso}
      mostrarBotoes={isMeuPerfil} 
      isLoading={isLoading}
    />
  </>
);

export default PerfilProfessor;
