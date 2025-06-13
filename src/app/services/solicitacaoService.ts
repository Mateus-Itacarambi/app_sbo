const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const solicitarOrientacao = async (professorId: number) => {
  const response = await fetch(`${API_URL}/solicitacoes/solicitarOrientacao/${professorId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const solicitarTema = async (temaId: number) => {
  const response = await fetch(`${API_URL}/solicitacoes/solicitarTema/${temaId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const aprovarSolicitacao = async (solicitacaoId: number) => {
  const response = await fetch(`${API_URL}/solicitacoes/aprovar/${solicitacaoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const rejeitarSolicitacao = async (solicitacaoId: number, motivo: string) => {
  const response = await fetch(`${API_URL}/solicitacoes/rejeitar/${solicitacaoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      motivo: motivo
    }),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const concluirSolicitacao = async (solicitacaoId: number) => {
  const response = await fetch(`${API_URL}/solicitacoes/concluir/${solicitacaoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const cancelarOrientacao = async (solicitacaoId: number, motivo: string) => {
  const response = await fetch(`${API_URL}/solicitacoes/cancelar/${solicitacaoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      motivo: motivo
    }),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};