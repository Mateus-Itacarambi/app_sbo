import Image from "next/image";
import figura from "@/assets/figura_inicio.png";
import styles from "./page.module.scss";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página Inicial",
};

export default function Home() {
  return (
    <main>
      <section className={styles.container}>
        <div className={styles.texto}>
          <h1>
            Está Procurando
            <br /> por um orientador?
          </h1>

          <p>
            Clique no botão abaixo para ser redirecionado ao
            <br /> sistema de busca!
          </p>

          <Link href="/professores">
            <button>Procurar</button>
          </Link>
        </div>
        <div className={styles.imagem}>
          <Image
            src={figura}
            height={680}
            alt="Ilustração de uma mulher segurando uma lupa ampliando a imagem de uma pessoa em uma lista de perfis."
            priority
          />
        </div>
      </section>
    </main>
  );
}
