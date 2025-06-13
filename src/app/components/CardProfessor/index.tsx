import styles from "./cardProfessor.module.scss";
import UsuarioProfile from "../UsuarioProfile";
import StatusBadge from "../StatusBadge";
import { StatusTipo } from "@/types";
import Link from "next/link";

export default function CardProfessor({ professor }: { professor: any }) {
  if (!professor || !professor.nome) {
    return <p className={styles.erro}>Erro ao carregar perfil do usuário</p>;
  }

  return (
    <div className={styles.card_perfil}>
    <UsuarioProfile usuario={professor} />

    <div className={styles.detalhes}>
        <h1>{professor?.nome}</h1>
        <p>{professor?.email}</p>
        {professor?.disponibilidade && (
            <StatusBadge status={professor?.disponibilidade as StatusTipo} />
        )}
    </div>

    <div className={styles.editar}>
        <Link href={`/perfil/${professor?.idLattes}`} target="_blank" >
            <button className={styles.editBtn}>Visualizar</button>
        </Link>
    </div>
    
</div>
  );
}
