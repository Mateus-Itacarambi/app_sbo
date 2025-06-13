"use client";

import styles from "./perfil.module.scss";
import PerfilCabecalho from "@/components/Perfil/PerfilCabecalho";
import { UsuarioNaoEncontrado } from "@/types";
import PerfilIcon from "@/assets/perfil.png";

export default function PerfilNaoEncontrado() {
  const usuario: UsuarioNaoEncontrado = {
    nome: "Usuário não encontrado",
    email: "O usuário que você está tentando acessar não existe.",
    role: "N/A",
    profileImage: PerfilIcon,
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.card_container}>
            <PerfilCabecalho usuario={usuario} onEditar={() => null} mostrarBotoes={false}/>
        </div>
      </div>
    </div>
  );
}