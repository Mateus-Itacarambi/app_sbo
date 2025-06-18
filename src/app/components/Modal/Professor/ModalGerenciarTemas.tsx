import { useForm, Controller } from "react-hook-form";
import { Tema, TemaDTO } from "@/types";
import ReactDOM from "react-dom";
import InputAuth from "../../InputAuth";
import ButtonAuth from "@/components/ButtonAuth";
import { useEffect, useState } from "react";
import styles from "./modalGerenciarFormacoes.module.scss";
import ModalConfirmar from "../ModalConfirmar";
import { useTemas } from "@/hooks";
import { schemaFormacao, schemaTema } from "@/utils/validacoesForm";
import { yupResolver } from "@hookform/resolvers/yup";

interface ModalGerenciarFormacoesProps {
  onClose: () => void;
  onAtualizar: (temaId: number, temas: TemaDTO) => void;
  onRemove: (temaId: number) => void;
  temasIniciais: Tema[];
  isLoading: boolean;
}

export default function ModalGerenciarFormacoes({ onClose, onAtualizar, onRemove, temasIniciais, isLoading }: ModalGerenciarFormacoesProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const [indiceSelecionado, setIndiceSelecionado] = useState<number | null>(null);
  
  const [modalConfirmarRemocaoTema, setModalConfirmarRemocaoTema] = useState(false);

  const {
    temas,
    setTemas,
    temaAtual,
    setTemaAtual,
    formularioEdicao,
    setFormularioEdicao,
    handleEditar,
  } = useTemas();
  
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TemaDTO>({
    resolver: yupResolver(schemaTema),
  });

  useEffect(() => {
    if (temaAtual) {
      reset({
        titulo: temaAtual.titulo,
        palavrasChave: temaAtual.palavrasChave,
        descricao: temaAtual.descricao,
      });
    }
  }, [temaAtual, reset]);

  useEffect(() => {
    setTemas(temasIniciais);
  }, [temasIniciais]);

  const handleChange = (campo: keyof Tema, valor: string) => {
    setFormularioEdicao({ ...formularioEdicao, [campo]: valor })
  };

  const handleCliqueTema = (tema: Tema) => {
    const temaClicado = temas.find((t) => t.id === tema.id);
    if (!temaClicado) return;

    const indexOriginal = temas.findIndex((t) => t.id === tema.id);
    setIndiceSelecionado(indexOriginal);
    setTemaAtual({ ...temaClicado });
    setFormularioEdicao({ ...temaClicado });
  };
  
  const onSubmit = async (data: TemaDTO) => {
    if (!temaAtual?.id) return;
    try {
      await onAtualizar(temaAtual.id, data);

      setTemas((prev) =>
        prev.map((t) => (t.id === temaAtual.id ? { ...t, ...data } : t))
      );
    } catch (error) {
      console.error("Erro ao atualizar tema:", error);
    }
  };

  const handleRemove = () => {
    if (temaAtual?.id === undefined) {
      console.error("ID do tema não definido.");
      return;
    }

    onRemove(temaAtual.id);

    setTemas((prev) => prev.filter((t) => t.id !== temaAtual.id));

    const professorTema: any = {
      id: 0,
      nome: "",
    };

    setTemaAtual({
      id: 0,
      titulo: "",
      descricao: "",
      palavrasChave: "",
      statusTema: "",
      professor: professorTema,
      estudantes: []
    });

    setModalConfirmarRemocaoTema(false)
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal_form} onClick={(e) => e.stopPropagation()}>
        <h2>Gerenciar Temas</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="titulo"
              control={control}
              render={({ field, fieldState }) => (
                <InputAuth
                  label="Título"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="palavrasChave"
              control={control}
              render={({ field, fieldState }) => (
                <InputAuth
                  label="Palavras-Chave"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="descricao"
              control={control}
              render={({ field, fieldState }) => (
                <InputAuth
                  label="Descrição"
                  type="textarea"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div className={styles.flex}>
            <ButtonAuth type="submit" text={"Remover Tema"} theme="secondary" margin="0" disabled={isLoading} onClick={() => setModalConfirmarRemocaoTema(true)} />
            <ButtonAuth type="submit" text={"Atualizar Tema"} theme="primary" margin="0" loading={isLoading} />
          </div>
        </form>
      </div>

      <div className={styles.modal_lista} onClick={(e) => e.stopPropagation()}>
        <h2>Selecione um tema</h2>
        <ul>
          {temas
            ?.slice()
            .sort((a, b) => a.titulo.localeCompare(b.titulo))
            .map((t) => (
              <li
                key={t.id || `${t.titulo}`}
                onClick={() => handleCliqueTema(t)}
                className={indiceSelecionado === temas.indexOf(t) ? styles.selecionado : ""}
              >
                <div className={styles.formacao}>
                  <strong>{t.titulo}</strong> – {t.descricao} ({t.palavrasChave})
                </div>
              </li>
            ))}
        </ul>

        <ButtonAuth type="button" text="Fechar" theme="secondary" onClick={onClose} margin="0" loading={isLoading} />
      </div>
      
      {modalConfirmarRemocaoTema && (
        <ModalConfirmar 
          titulo="Remover Tema"
          descricao="Tem certeza que deseja remover este tema?"
          onClose={() => setModalConfirmarRemocaoTema(false)}
          handleRemover={handleRemove}
          isLoading={isLoading}
        />
      )}
    </div>,
    document.body
  );
}
