"use client";

import Perfil from "@/components/Perfil/Perfil";
import { useAuth } from "@/contexts/AuthContext";

export default function PerfilPage() {
  const { usuario } = useAuth();

  return (
    <Perfil usuarioVisualizado={usuario}/>
  );
}