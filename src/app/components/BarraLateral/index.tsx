import Image from "next/image";
import styles from "./barra-lateral.module.scss";
import loginImagem from "@/assets/login/login.svg";
import Logo from "../Logo";

export default function BarraLateral() {
  return (
    <div className={styles.barra_lateral}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.imagem}>
        <Image src={loginImagem} alt="" width={600} priority />
      </div>
    </div>
  );
}
