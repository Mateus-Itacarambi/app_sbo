import styles from "./usuarioProfile.module.scss";
import Image from "next/image";
import { getInitials } from "@/utils/getInitials";
import { Check, X } from "lucide-react";

export default function UsuarioProfile({ usuario }: { usuario: any }) {
  if (!usuario || !usuario.nome) {
    return <p className={styles.erro}>Erro ao carregar perfil do usuário</p>;
  }

  return (
    <div className={styles.profile}>
      {usuario.profileImage ? (
        <Image
          src={usuario.profileImage}
          alt="Foto de perfil"
          width={100}
          height={100}
          className={styles.profileImage}
        />
      ) : (
        <div className={styles.initials}>
          {getInitials(usuario.nome)}

          {usuario.disponibilidade === "DISPONIVEL" ? (
            <div className={`${styles.status} ${styles.disponivel}`}>
              <Check size={"15px"} strokeWidth={"4px"} />
            </div>
          ) : usuario.disponibilidade === "INDISPONIVEL" ? (
            <div className={`${styles.status} ${styles.indisponivel}`}>
              <X size={"15px"} strokeWidth={"4px"} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
