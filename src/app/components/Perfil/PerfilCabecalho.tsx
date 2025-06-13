import styles from "./perfil.module.scss";
import { Estudante, Professor, UsuarioNaoEncontrado, UsuarioCompleto } from "@/types";
import UsuarioProfile from "../UsuarioProfile";

interface PerfilCabecalhoProps {
  usuario: UsuarioCompleto | UsuarioNaoEncontrado;
  onEditar?: () => void;
  mostrarBotoes?: boolean;
}


const statusMap: Record<string, string> = {
  DISPONIVEL: 'Disponível',
  INDISPONIVEL: 'Indisponível',
};

export default function PerfilCabecalho({ usuario, onEditar, mostrarBotoes }: PerfilCabecalhoProps) {
  return (
    <div className={styles.card_perfil}>
        <UsuarioProfile usuario={usuario} />

        <div className={styles.detalhes}>
            <h1>{usuario.nome}</h1>
            <p>{usuario.email}</p>
            {usuario.role === "ESTUDANTE" && <p>{(usuario as Estudante).curso?.nome} - {(usuario as Estudante).semestre}º semestre</p>}
            {usuario.role === "PROFESSOR" && <p>{statusMap[(usuario as Professor).disponibilidade]}</p>}
        </div>
        {mostrarBotoes && (
          <div className={styles.editar}>
            <button className={styles.editBtn} onClick={onEditar}>Editar</button>
          </div>
        )}
    </div>
  );
}
