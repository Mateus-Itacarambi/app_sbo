import styles from "../perfil.module.scss";
import { Curso, CursoProfessor } from "@/types";
import ButtonAuth from "@/components/ButtonAuth";
import CustomBadge from "@/components/CustomBadge";

interface CardCursoProps {
  cursos?: CursoProfessor[] | null;
  onAdicionarCurso: () => void;
  mostrarBotoes: boolean;
  onRemoverCurso: (cursoId: number) => void;
  isLoading: boolean;
}

export default function CardCurso({ cursos, mostrarBotoes, onAdicionarCurso, onRemoverCurso, isLoading }: CardCursoProps) {
  if (!cursos || cursos.length === 0) {
    return (
      <>
        <div className={styles.card_formacao}>
          <div className={styles.titulo}>
            <h2>Cursos</h2>
          </div>
          <p>Não possui cursos cadastrados.</p>
          {mostrarBotoes && (
            <ButtonAuth text="Adicionar Cursos" type="button" theme="primary" margin="2rem 0 0 0" onClick={onAdicionarCurso} loading={isLoading} />
          )}
        </div>
      </>
    );
  }

  return (
    <div className={styles.card_cursos}>
      <div className={styles.titulo}>
        <h2>Cursos</h2>
      </div>
      
      <ul className={styles.lista_cursos}>
        {cursos
          ?.slice()
          .sort((a, b) => a.nome.localeCompare(b.nome))
          .map((curso, idx) => (
          <li key={idx} className={styles.curso}>
              <CustomBadge 
                curso={curso}
                style={mostrarBotoes ? "myCurso" : "curso"} 
                mostrarBotao={mostrarBotoes}
                onRemover={onRemoverCurso}
                />
          </li>
        ))
        }
        {mostrarBotoes && (
          <button className={styles.adicionar} onClick={onAdicionarCurso}>Adicionar Cursos</button>
        )}
      </ul>
    </div>
  );
}
