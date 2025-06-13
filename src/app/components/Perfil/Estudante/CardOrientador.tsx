import styles from "../perfil.module.scss";
import { Estudante, Professor, ProfessorCurso } from "@/types";
import ButtonAuth from "@/components/ButtonAuth";
import Link from "next/link";
import CardProfessor from "@/components/CardProfessor";

interface CardOrientadorProps {
  usuario?: Estudante;
  orientador?: Professor | ProfessorCurso | null;
  mostrarBotoes: boolean;
  isLoading: boolean;
}

export default function CardOrientador({ orientador, mostrarBotoes, isLoading }: CardOrientadorProps) {

  return ( 
    <div className={styles.card_orientador}>
      <h2>Orientador</h2>
      {orientador ? (
        <CardProfessor professor={orientador} />
        ) : (
          <>
            <p>Não possui orientador.</p>
            <Link href="/professores">
              {mostrarBotoes && (
                <ButtonAuth text="Buscar orientador" type="button" theme="primary" margin="2rem 0 0 0" loading={isLoading} />
              )}
            </Link>
          </>
      )}
    </div>
  );
}
