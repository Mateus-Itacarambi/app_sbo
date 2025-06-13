"use client";
import { useRouter } from "next/navigation";
import { UsuarioCompleto, Professor, Estudante } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function atualizarPerfil(
  e: React.FormEvent,
  usuario: UsuarioCompleto,
  formData: any,
  identificadorAtual: string,
  router: ReturnType<typeof useRouter>,
  setSucesso: (mensagem: string) => void
) {
  if (!usuario) return;

  e.preventDefault();
  const endpoint = usuario.role === "ESTUDANTE" ? "/estudantes" : "/professores";

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao atualizar perfil");
  }

  const usuarioAtualizado: UsuarioCompleto = await response.json();

  const novoIdentificador =
    usuarioAtualizado.role === "ESTUDANTE"
      ? (usuarioAtualizado as Estudante).matricula
      : (usuarioAtualizado as Professor).idLattes;

  if (novoIdentificador !== identificadorAtual) {
    router.push(`/perfil/${novoIdentificador}`);
    setSucesso("Perfil atualizado com sucesso!");
  } else {
    localStorage.setItem("mensagemSucesso", "Perfil atualizado com sucesso!");
    location.reload();
  }

  return usuarioAtualizado;
}

export const buscarProfessores = async (): Promise<Professor[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/professores/lista`, {
    credentials: "include",
  });
  return await res.json();
};
