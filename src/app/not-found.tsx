import styles from "./not-found.module.scss";
import Image from "next/image";
import ImgNotFound from "@/assets/not-found.png";
import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <div className={styles.container}>
        <Image
          src={ImgNotFound}
          alt="Ilustração de erro 404 - Página não encontrada"
          width={650}
        />
        <Link href={"/"}>
          <button className={styles.button}>Voltar para o Início</button>
        </Link>
      </div>
    </main>
  );
}
