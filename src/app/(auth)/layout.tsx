"use client";

import styles from "../components/BarraLateral/barra-lateral.module.scss";
import BarraLateral from "../components/BarraLateral";
import { AuthProvider } from "@/contexts/AuthContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <main className={styles.container}>
          <BarraLateral />
          {children}
        </main>
      </AuthProvider>
    </>
  );
}
