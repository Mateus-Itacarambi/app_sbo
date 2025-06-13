import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { Solicitacao } from "@/types/solicitacao";

type UseWebSocketSolicitacoesProps = {
  userId: number;
  onNovaSolicitacao: (solicitacao: Solicitacao) => void;
  onRemoverSolicitacao?: (id: number) => void;
};

export function useWebSocketSolicitacoes({
  userId,
  onNovaSolicitacao,
  onRemoverSolicitacao,
}: UseWebSocketSolicitacoesProps) {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!userId || userId <= 0) return;

    const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        stompClient.subscribe(`/topic/solicitacoes/${userId}`, (message) => {
          const body = JSON.parse(message.body);

          if (body.removerSolicitacaoId && onRemoverSolicitacao) {
            onRemoverSolicitacao(body.removerSolicitacaoId);
          } else {
            const solicitacao: Solicitacao = body;
            onNovaSolicitacao(solicitacao);
          }
        });
      },
      onStompError: (frame) => {
        console.error("Erro STOMP em solicitações:", frame);
      },
    });

    stompClient.activate();
    clientRef.current = stompClient;

    return () => {
      clientRef.current?.deactivate();
    };
  }, [userId, onNovaSolicitacao, onRemoverSolicitacao]);
}
