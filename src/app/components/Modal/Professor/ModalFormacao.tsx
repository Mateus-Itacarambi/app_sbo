import styles from "../modal.module.scss";

import { FormacaoDTO } from "@/types";
import Modal from "../Modal";
import InputAuth from "../../InputAuth";
import ButtonAuth from "@/components/ButtonAuth";
import { useFormacao } from "@/hooks/useFormacao";

interface ModalFormacaoProps {
  onClose: () => void;
  onSalvar: (formacao: FormacaoDTO) => void;
  onCancelar: () => void;
  isLoading: boolean;
}

export default function ModalFormacao({ onSalvar, onClose, onCancelar, isLoading }: ModalFormacaoProps) {
  const formacao = useFormacao();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const novaFormacao: FormacaoDTO = {
      curso: formacao.curso,
      instituicao: formacao.instituicao,
      titulo: formacao.titulo,
      anoInicio: Number(formacao.anoInicio),
      anoFim: Number(formacao.anoFim),
    };

    onSalvar(novaFormacao);
  };

  return (
    <Modal onClose={onClose}>
      <h2>Adicionar Formação</h2>

      <form onSubmit={handleSubmit}>
        <InputAuth label="Curso" type="text" value={formacao.curso} onChange={(e) => formacao.setCurso(e.target.value)} />
        <InputAuth label="Instituição" type="text" value={formacao.instituicao} onChange={(e) => formacao.setInstituicao(e.target.value)} />
        <InputAuth label="Título do TCC" type="text" value={formacao.titulo} onChange={(e) => formacao.setTitulo(e.target.value)} />

        <div className={styles.flex}>
          <InputAuth label="Ano de Início" type="number" value={formacao.anoInicio.toString()} onChange={(e) => formacao.setAnoInicio(e.target.value)} />
          <InputAuth label="Ano de Conclusão" type="number" value={formacao.anoFim.toString()} onChange={(e) => formacao.setAnoFim(e.target.value)} />
          
          <ButtonAuth text="Cancelar" type="button" theme="secondary" onClick={onCancelar} margin="0" loading={isLoading} />
          <ButtonAuth type="submit" text={"Adicionar Formação"} theme="primary" margin="0" loading={isLoading} />
        </div>
      </form>
    </Modal>
  );
}
