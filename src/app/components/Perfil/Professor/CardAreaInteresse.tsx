import styles from "../perfil.module.scss";
import { AreaInteresse } from "@/types";
import ButtonAuth from "@/components/ButtonAuth";
import AreaInteresseBadge from "@/components/CustomBadge";

interface CardTemaProps {
  areasInteresse?: AreaInteresse[] | null;
  onAdicionarArea: () => void;
  mostrarBotoes: boolean;
  onRemoverAreaInteresse: (areaInteresseId: number) => void;
  isLoading: boolean;
}

export default function CardTema({ areasInteresse, mostrarBotoes, onAdicionarArea, onRemoverAreaInteresse, isLoading }: CardTemaProps) {
  if (!areasInteresse || areasInteresse.length === 0) {
    return (
      <>
        <div className={styles.card_areasInteresse}>
          <div className={styles.titulo}>
            <h2>Áreas de Interesse</h2>
          </div>
          <p>Não possui áreas de interesse cadastradas.</p>
          {mostrarBotoes && (
            <ButtonAuth text="Adicionar Áreas de Interesse" type="button" theme="primary" margin="2rem 0 0 0" onClick={onAdicionarArea} loading={isLoading} />
          )}
        </div>
      </>
    );
  }

  return (
    <div className={styles.card_areasInteresse}>
      <div className={styles.titulo}>
        <h2>Áreas de Interesse</h2>
      </div>
      
      <ul className={styles.lista_areasInteresse}>
        {areasInteresse
          ?.slice()
          .sort((a, b) => a.nome.localeCompare(b.nome))
          .map((areaInteresse, idx) => (
          <li key={areaInteresse.id} className={styles.areaInteresse}>
            <AreaInteresseBadge 
              areaInteresse={areaInteresse}
              style={mostrarBotoes ? "myBadge" : "badge"} 
              mostrarBotao={mostrarBotoes}
              onRemover={onRemoverAreaInteresse}
              />
          </li>
        ))
        }
        {mostrarBotoes && (
          <button className={styles.adicionar} onClick={onAdicionarArea}>Adicionar áreas de interesse</button>
        )}
      </ul>
    </div>
  );
}
