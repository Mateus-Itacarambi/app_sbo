import { Professor, Formacao, FormacaoDTO } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const adicionarFormacao = async (usuario: Professor, dados: FormacaoDTO) => {
  const response = await fetch(`${API_URL}/professores/${usuario.id}/adicionarFormacoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dados),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const atualizarFormacao = async (usuario: Professor, formacaoId: number, dados: FormacaoDTO) => {
  const response = await fetch(`${API_URL}/professores/${usuario.id}/atualizarFormacoes/${formacaoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dados),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const removerFormacao = async (usuario: Professor, formacaoId: number) => {
  const response = await fetch(`${API_URL}/professores/${usuario.id}/removerFormacoes/${formacaoId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error(await response.text());
};