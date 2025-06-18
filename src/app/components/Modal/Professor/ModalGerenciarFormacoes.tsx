import { useForm, Controller } from "react-hook-form";
import { Formacao, FormacaoDTO } from "@/types";
import ReactDOM from "react-dom";
import InputAuth from "../../InputAuth";
import ButtonAuth from "@/components/ButtonAuth";
import { useFormacoes } from "@/hooks/useFormacoes";
import { useEffect, useState } from "react";
import styles from "./modalGerenciarFormacoes.module.scss";
import ModalConfirmar from "../ModalConfirmar";
import { schemaFormacao } from "@/utils/validacoesForm";
import { yupResolver } from "@hookform/resolvers/yup";

interface ModalGerenciarFormacoesProps {
  onClose: () => void;
  onAtualizar: (formacaoId: number, formacoes: FormacaoDTO) => void;
  onRemove: (formacaoId: number) => void;
  formacoesIniciais: Formacao[];
  isLoading: boolean;
}

export default function ModalGerenciarFormacoes({ onClose, onAtualizar, onRemove, formacoesIniciais, isLoading }: ModalGerenciarFormacoesProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const [indiceSelecionado, setIndiceSelecionado] = useState<number | null>(null);
  
  const [modalConfirmarRemocaoFormacao, setModalConfirmarRemocaoFormacao] = useState(false);

  const {
    formacoes,
    setFormacoes,
    formacaoAtual,
    setFormacaoAtual,
    setFormularioEdicao,
  } = useFormacoes();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormacaoDTO>({
    resolver: yupResolver(schemaFormacao),
  });

  useEffect(() => {
    if (formacaoAtual) {
      reset({
        curso: formacaoAtual.curso,
        instituicao: formacaoAtual.instituicao,
        titulo: formacaoAtual.titulo,
        anoInicio: formacaoAtual.anoInicio,
        anoFim: formacaoAtual.anoFim,
      });
    }
  }, [formacaoAtual, reset]);

  useEffect(() => {
    setFormacoes(formacoesIniciais);
  }, [formacoesIniciais]);

  const handleCliqueFormacao = (formacao: Formacao) => {
    const formacaoClicada = formacoes.find((f) => f.id === formacao.id);
    if (!formacaoClicada) return;

    const indexOriginal = formacoes.findIndex((f) => f.id === formacao.id);
    setIndiceSelecionado(indexOriginal);
    setFormacaoAtual({ ...formacaoClicada });
    setFormularioEdicao({ ...formacaoClicada });
  };

  const onSubmit = async (data: FormacaoDTO) => {
    if (!formacaoAtual?.id) return;
    try {
      await onAtualizar(formacaoAtual.id, data);

      setFormacoes((prev) =>
        prev.map((f) => (f.id === formacaoAtual.id ? { ...f, ...data } : f))
      );
    } catch (error) {
      console.error("Erro ao atualizar formação:", error);
    }
  };

  const handleRemove = () => {
    if (formacaoAtual?.id === undefined) {
      console.error("ID da formação não definido.");
      return;
    }

    onRemove(formacaoAtual.id);

    setFormacoes((prev) => prev.filter((f) => f.id !== formacaoAtual.id));

    setFormacaoAtual({
      id: 0,
      curso: "",
      instituicao: "",
      titulo: "",
      anoInicio: new Date().getFullYear(),
      anoFim: new Date().getFullYear(),
    });

    setModalConfirmarRemocaoFormacao(false)
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal_form} onClick={(e) => e.stopPropagation()}>
        <h2>Gerenciar Formações</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="curso"
            control={control}
            render={({ field, fieldState }) => (
              <InputAuth
                label="Curso"
                type="text"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="instituicao"
            control={control}
            render={({ field, fieldState }) => (
              <InputAuth
                label="Instituição"
                type="text"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="titulo"
            control={control}
            render={({ field, fieldState }) => (
              <InputAuth
                label="Título do TCC"
                type="text"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <div className={styles.flex}>
            <Controller
              name="anoInicio"
              control={control}
              render={({ field, fieldState }) => (
                <InputAuth
                  label="Ano de Início"
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="anoFim"
              control={control}
              render={({ field, fieldState }) => (
                <InputAuth
                  label="Ano de Conclusão"
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={fieldState.error?.message}
                />
              )}
            />

            <ButtonAuth type="submit" text={"Remover Formação"} theme="secondary" margin="0" disabled={isLoading} onClick={() => setModalConfirmarRemocaoFormacao(true)} />
            <ButtonAuth type="submit" text={"Atualizar Formação"} theme="primary" margin="0" loading={isLoading} />
          </div>
        </form>
      </div>

      <div className={styles.modal_lista} onClick={(e) => e.stopPropagation()}>
        <h2>Selecione uma formação</h2>
        <ul>
          {formacoes
            ?.slice()
            .sort((a, b) => a.anoInicio - b.anoInicio)
            .map((f) => (
              <li
                key={f.id || `${f.curso}-${f.anoInicio}`}
                onClick={() => handleCliqueFormacao(f)}
                className={indiceSelecionado === formacoes.indexOf(f) ? styles.selecionado : ""}
              >
                <div className={styles.formacao}>
                  <strong>{f.curso}</strong> – {f.instituicao} – {f.titulo} ({f.anoInicio}–{f.anoFim})
                </div>
              </li>
            ))}
        </ul>

        <ButtonAuth type="button" text="Fechar" theme="secondary" onClick={onClose} margin="0" loading={isLoading} />
      </div>
      
      {modalConfirmarRemocaoFormacao && (
        <ModalConfirmar 
          titulo="Remover Formação"
          descricao="Tem certeza que deseja remover esta formação?"
          onClose={() => setModalConfirmarRemocaoFormacao(false)}
          handleRemover={handleRemove}
          isLoading={isLoading}
        />
      )}
    </div>,
    document.body
  );
}
