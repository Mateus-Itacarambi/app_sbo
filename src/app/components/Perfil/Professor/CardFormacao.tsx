import styles from "../perfil.module.scss";
import { Professor, Formacao } from "@/types";
import ButtonAuth from "@/components/ButtonAuth";
import Dropdown from "../../Dropdown";
import Image from "next/image";
import Icone from "@/assets/tres-pontos.png";

interface CardFormacaoProps {
  formacoes?: Formacao[] | null;
  onGerenciar: () => void;
  onAdicionarFormacao: () => void;
  mostrarBotoes: boolean;
  isLoading: boolean;
}

export default function CardFormacao({ formacoes, mostrarBotoes, onGerenciar, onAdicionarFormacao, isLoading }: CardFormacaoProps) {
  if (!formacoes || formacoes.length === 0) {
    return (
      <>
        <div className={styles.card_formacao}>
          <div className={styles.titulo}>
            <h2>Formação/Titulação acadêmica</h2>
          </div>
          <p>Não possui formações cadastradas.</p>
          {mostrarBotoes && (
            <ButtonAuth text="Adicionar Formação" type="button" theme="primary" margin="2rem 0 0 0" onClick={onAdicionarFormacao} loading={isLoading} />
          )}
        </div>
      </>
    );
  }

  return (
    <div className={styles.card_formacao}>
      <div className={styles.titulo}>
        <h2>Formação/Titulação acadêmica</h2>
        {mostrarBotoes && (
          <Dropdown
            label=""
            width="17rem"
            top="2rem"
            icon={<div className={styles.icon}><Image src={Icone} alt=""/></div>}
            items={[
              { type: "link", label: "", href: "" },
              { type: "action", label: "Adicionar Formação", onClick: onAdicionarFormacao },
              { type: "action", label: "Gerenciar Formações", onClick: onGerenciar },
            ]}
          />
        )}
      </div>

      <ul className={styles.lista_formacoes}>
        {formacoes
          ?.slice()
          .sort((a, b) => a.anoInicio - b.anoInicio)
          .map((formacao, idx) => (
          <li key={idx} className={styles.card_formacao}>
            <div className={styles.periodo}>
              <p>
                <strong>{formacao.anoInicio}</strong>
                <strong>–</strong>
                <strong>{formacao.anoFim}</strong>
              </p>
            </div>
            <div className={styles.formacao}>
              <p><strong>{formacao.curso}</strong></p>
              <p><strong>{formacao.instituicao}</strong></p>
              <p><strong>Título: </strong>{formacao.titulo}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
