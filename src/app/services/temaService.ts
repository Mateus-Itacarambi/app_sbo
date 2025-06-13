import { Estudante, Professor, TemaDTO, UsuarioCompleto } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface TemaPayload {
  titulo: string;
  palavrasChave: string;
  descricao: string;
}

export const cadastrarTema = async (e: React.FormEvent, usuario: Estudante, dados: TemaPayload) => {
  e.preventDefault();
  const response = await fetch(`${API_URL}/temas/estudante/${usuario.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dados),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const adicionarTema = async (usuario: Professor, dados: TemaDTO): Promise<TemaDTO>  => {
  const response = await fetch(`${API_URL}/temas/professor/${usuario.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dados),
  });
  if (!response.ok) throw new Error(await response.text());
  const novoTema = await response.json();
  return novoTema;
};

export const atualizarTema = async (e: React.FormEvent, usuario: Estudante, dados: TemaPayload) => {
  e.preventDefault();
  const response = await fetch(`${API_URL}/temas/${(usuario as Estudante).tema?.id}/atualizar/${usuario.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao atualizar tema!");
  }

  return await response.json();
};

export const atualizarTemaProfessor = async (usuario: Professor, temaId: number, dados: TemaDTO) => {
  const response = await fetch(`${API_URL}/temas/${temaId}/atualizar/${usuario.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dados),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const removerTema = async (usuario: UsuarioCompleto, temaId: number) => {
  const response = await fetch(`${API_URL}/temas/${temaId}/deletar/${usuario.id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) throw new Error(await response.text());
};

export const adicionarEstudanteTema = async (e: React.FormEvent, usuario: UsuarioCompleto,  matricula: string) => {
  if (!usuario || !(usuario as Estudante).tema) return;
  e.preventDefault();
  const response = await fetch(`${API_URL}/temas/${(usuario as Estudante).tema?.id}/adicionarEstudante/${usuario.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      matricula: matricula
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao adicionar estudante!");
  }

  return await response.json();
};

export const removerEstudanteTema = async (e: React.FormEvent, usuario: UsuarioCompleto,  matricula: string) => {
  if (!usuario || !(usuario as Estudante).tema) return;
  e.preventDefault();
  const response = await fetch(`${API_URL}/temas/${(usuario as Estudante).tema?.id}/removerEstudante/${usuario.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      matricula: matricula
    }),
  });
  
  if (!response.ok) throw new Error(await response.text());
};
  