import { Professor } from '@/types';
import { useState, useEffect } from 'react';

export const useOrientador = (usuario: any) => {
  const [orientador, setOrientador] = useState<Professor | null>(null);
  
  useEffect(() => {
    const fetchOrientador = async () => {
      if (!usuario || !(usuario as any).tema?.professor) return;
  
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/professores/${(usuario as any).tema?.professor.id}`, {
          credentials: "include",
        });
  
        if (res.ok) {
          const orientador = await res.json();
          setOrientador(orientador);
        } else {
          throw new Error("Erro ao buscar orientador");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
  
    fetchOrientador();
  }, [usuario]);

  return { orientador };
};