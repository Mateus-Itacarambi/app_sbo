import styles from "../perfil.module.scss";
import { Estudante, UsuarioCompleto, StatusTipo } from "@/types";
import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import Icone from "@/assets/tres-pontos.png";
import StatusBadge from "@/components/StatusBadge";
import ButtonAuth from "@/components/ButtonAuth";
import { useState } from "react";
import ModalConfirmar from "@/components/Modal/ModalConfirmar";

interface CardTemaProps {
  usuario: UsuarioCompleto;
  onEditar: () => void;
  onRemover: () => void;
  onAdicionarEstudante: () => void;
  onRemoverEstudante: () => void;
  onAdicionarTema: () => void;
  mostrarBotoes: boolean;
  isLoading: boolean;
}

export default function CardTema({ usuario, onEditar, onRemover, onAdicionarEstudante, onRemoverEstudante, onAdicionarTema, mostrarBotoes, isLoading }: CardTemaProps) {
  const [modalConfirmarRemocaoTema, setModalConfirmarRemocaoTema] = useState(false);

  return (
    <div className={styles.card_tema}>
      <h2>Tema</h2>
      {(usuario as Estudante).tema ? (
        <div className={styles.tema}>
          <div className={styles.tema_content}>
            <div className={styles.title}>
              <span>{(usuario as Estudante).tema?.titulo}</span>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {mostrarBotoes && (
                    <Dropdown
                      label=""
                      width="17rem"
                      top="2rem"
                      icon={<div className={styles.icon}><Image src={Icone} alt=""/></div>}
                      items={[
                        { type: "link", label: "", href: "" },
                        { type: "action", label: "Editar", onClick: onEditar },
                        { type: "action", label: "Remover", onClick: () => setModalConfirmarRemocaoTema(true) },
                        { type: "action", label: "Adicionar Estudante", onClick: onAdicionarEstudante },
                        { type: "action", label: "Remover Estudante", onClick: onRemoverEstudante },
                      ]}
                    />
                  )}
                </div>
            </div>
            {(usuario as Estudante).tema?.statusTema && (
                <StatusBadge status={(usuario as Estudante).tema?.statusTema as StatusTipo} />
            )}
            <div className={styles.keywords}>{(usuario as Estudante).tema?.palavrasChave}</div>
            <div className={styles.description}>
              {(usuario as Estudante).tema?.estudantes
                ?.map(e => e.nome)
                .sort((a, b) => a.localeCompare(b))
                .join(', ') || 'Nenhum estudante'}
            </div>
            <div className={styles.description}>{(usuario as Estudante).tema?.descricao}</div>
          </div>
        </div>

      ) : (
        <>
          <p>Não possui um tema cadastrado.</p>
          {mostrarBotoes && (
            <ButtonAuth text="Adicionar Tema" type="button" theme="primary" onClick={onAdicionarTema} loading={isLoading} />
          )}
        </>
      )}

      {modalConfirmarRemocaoTema && (
        <ModalConfirmar
          titulo="Remover Tema"
          descricao="Tem certeza que deseja remover este tema?"
          onClose={() => setModalConfirmarRemocaoTema(false)}
          handleRemover={onRemover}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
