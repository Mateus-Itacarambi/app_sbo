"use client";

import styles from "./Loading.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Loading() {
  const { usuario, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (usuario && !usuario.cadastroCompleto && pathname !== '/atualizar-cadastro') {
        router.push('/atualizar-cadastro');
      }
    }
  }, [usuario, loading, pathname, router]);

  return (
    <>
      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </>
  );
}
