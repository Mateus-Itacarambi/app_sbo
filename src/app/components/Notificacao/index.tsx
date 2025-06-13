"use client";
import { useEffect, useState } from "react";
import styles from "./notificacao.module.scss";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { NotificacaoDTO } from "@/types/notificacao";

interface Props {
  visivel: boolean;
  onClose: () => void;
  notificacoes: NotificacaoDTO[];
  marcarTodasComoLidas: () => void;
  marcarComoLida: (idNotificacao: number) => void;
}

export default function Notificacao({ visivel, onClose, notificacoes, marcarTodasComoLidas, marcarComoLida}: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className={`${styles.overlay} ${visivel ? styles.aberto : ""}`} onClick={onClose}>
      <aside className={styles.aside} onClick={(e) => e.stopPropagation()}>
        <h1>
            <ChevronLeft style={{cursor: "pointer"}} size={"30px"} strokeWidth={"2px"} onClick={() => { onClose(); }} />
            Notificações
        </h1>
        <ul>
          <div className={styles.notificacoes}>
            {notificacoes.map((n) => {
              if (n.tipo === "TEMA") { 
                return (
                    <Link href={`/solicitacoes`} onClick={() => { marcarComoLida(n.id); onClose(); }}>
                      <li key={n.id}>
                        {!n.lida && <span className={styles.lida}></span>}
                        <p>
                          <span>{n.solicitante?.nome}</span>{n.mensagem}
                        </p>
                        <small>{new Date(n.dataCriacao).toLocaleString()}</small>
                      </li>
                    </Link>
                );
              } else {
                return (
                  <Link href={`/solicitacoes`} onClick={() => { marcarComoLida(n.id); onClose(); }}>
                    <li key={n.id}>
                      {!n.lida && <span className={styles.lida}></span>}
                      <p>
                        {n.mensagem}<span>{n.solicitante?.nome}.</span> 
                      </p>
                      <small>{new Date(n.dataCriacao).toLocaleString()}</small>
                    </li>
                  </Link>
                );
              }
            })}
          </div>
          <button className={styles.marcar_todos} onClick={() => { marcarTodasComoLidas(); onClose(); }}>Marcar todas como lidas</button>
        </ul>
      </aside>
    </div>
  );
}
