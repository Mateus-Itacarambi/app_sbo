"use client";

import { useEffect, useState } from "react";
import AvisoTelaPequena from "@/components/TelaRestritaWrapper/AvisoTelaPequena";

export default function TelaRestritaWrapper({ children }: { children: React.ReactNode }) {
  const [telaPequena, setTelaPequena] = useState<boolean | null>(null);

  useEffect(() => {
    const verificarTamanho = () => {
      setTelaPequena(window.innerWidth < 1024);
    };

    verificarTamanho();
    window.addEventListener("resize", verificarTamanho);

    return () => window.removeEventListener("resize", verificarTamanho);
  }, []);

  if (telaPequena === null) return null;
  if (telaPequena) return <AvisoTelaPequena />;

  return <>{children}</>;
}
