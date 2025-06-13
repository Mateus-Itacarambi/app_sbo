import CardProfessor from "../CardProfessor";
import styles from "./curso.module.scss";
import { Curso } from "@/types"

interface CursoPerfilProps {
  curso: Curso;
}

export default function CursoPerfil({ curso }: CursoPerfilProps) {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <section className={styles.curso_perfil}>
          <h1>{curso.nome} - ({curso.sigla})</h1>

          <div className={styles.descricao}>
            <h2>Sobre o curso:</h2>
            <p>{curso.descricao}</p>
          </div>

          <div className={styles.info}>
            <h2>Ficha técnica:</h2>
            <p>
              <strong>Carga horária: </strong>
              {curso.cargaHoraria}
            </p>
            <p>
              <strong>Semestres: </strong>
              {curso.semestres} semestres
            </p>
            <p>
              <strong>Duração máxima: </strong>
              {curso.duracaoMax}
            </p>
            <p>
              <strong>Modalidade: </strong>
              {curso.modalidade}
            </p>
          </div>

          <div className={styles.professores}>
            <h2>Professores do curso:</h2>
            {curso.professores.length === 0 ? (
              <p>Nenhum professor vinculado a este curso.</p>
            ) : (
              <ul>
                {curso.professores.map((prof) => (
                  <li key={prof.id}>
                    <CardProfessor professor={prof} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
