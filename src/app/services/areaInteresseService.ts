import { Professor, AreaInteresse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const adicionarAreasInteresse = async (usuario: Professor, dados: AreaInteresse[]) => {
  const response = await fetch(`${API_URL}/professores/${usuario.id}/adicionarAreasInteresse`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dados.map(area => area.id)),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const removerAreaInteresse = async (usuario: Professor, areaInteresseId: number) => {
  const response = await fetch(`${API_URL}/professores/${usuario.id}/removerAreaInteresse/${areaInteresseId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error(await response.text());
};

export const buscarAreasInteresse = async (): Promise<AreaInteresse[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/areasInteresse/lista`, {
    credentials: "include",
  });
  return await res.json();
};