import styles from "../perfil.module.scss";
import { Tema, StatusTipo } from "@/types";
import ButtonAuth from "@/components/ButtonAuth";
import Dropdown from "../../Dropdown";
import Image from "next/image";
import Icone from "@/assets/tres-pontos.png";
import StatusBadge from "@/components/StatusBadge";
import { useState } from "react";
import { useSolicitacaoActions } from "@/hooks/useSolicitacaoActions";

interface CardTemaProps {
  temas?: Tema[] | null;
  onGerenciar: () => void;
  onAdicionarTema: () => void;
  mostrarBotoes: boolean;
  isLoading: boolean;
}

export default function CardTema({ temas, mostrarBotoes, onGerenciar, onAdicionarTema, isLoading }: CardTemaProps) {
  if (!temas || temas.length === 0) {
    return (
      <>
        <div className={styles.card_formacao}>
          <div className={styles.titulo}>
            <h2>Temas</h2>
          </div>
          <p>Não possui temas cadastradas.</p>
          {mostrarBotoes && (
            <ButtonAuth text="Adicionar Tema" type="button" theme="primary" margin="2rem 0 0 0" onClick={onAdicionarTema} loading={isLoading} />
          )}
        </div>
      </>
    );
  }

  return (
    <div className={styles.card_temas}>
      <div className={styles.titulo}>
        <h2>Temas</h2>
        {mostrarBotoes && (
          <Dropdown
            label=""
            width="17rem"
            top="2rem"
            icon={<div className={styles.icon}><Image src={Icone} alt=""/></div>}
            items={[
              { type: "link", label: "", href: "" },
              { type: "action", label: "Adicionar Tema", onClick: onAdicionarTema },
              { type: "action", label: "Gerenciar Temas", onClick: onGerenciar },
            ]}
          />
        )}
      </div>

      <ul className={styles.lista_temas}>
        {temas
          ?.slice()
          .sort((a, b) => a.titulo.localeCompare(b.titulo))
          .map((tema, idx) => {
            return (
              <li key={idx} className={styles.tema}>
                <div className={styles.tema_content}>
                  <div className={styles.title}>
                    {tema.titulo}
                  </div>
                  <StatusBadge status={tema.statusTema as StatusTipo} />
                  <div className={styles.keywords}>{tema.palavrasChave}</div>
                  {(tema.estudantes ?? []).length > 0 && (
                    <div className={styles.description}>
                      {(tema.estudantes ?? [])
                        .map(e => e.nome)
                        .sort((a, b) => a.localeCompare(b))
                        .join(', ')}
                    </div>
                  )}
                  <div className={styles.description}>{tema.descricao}</div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
