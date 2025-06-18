import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modalEditarPerfil.module.scss";
import InputAuth from "@/components/InputAuth";
import SelectAuth from "@/components/SelectAuth";
import ButtonAuth from "@/components/ButtonAuth";
import { Estudante, generos, Professor } from "@/types";
import { schemaEditarPerfil } from "@/utils/validacoesForm";
import { yupResolver } from "@hookform/resolvers/yup";

interface ModalEditarPerfilProps {
  usuario: any;
  cursos: any[];
  onClose: () => void;
  onSalvarPerfil: (formData: any) => void;
  handleCancelar: () => void;
  isLoading: boolean;
}

export default function ModalEditarPerfil({
  usuario,
  cursos,
  onClose,
  onSalvarPerfil,
  handleCancelar,
  isLoading,
}: ModalEditarPerfilProps) {
  const professor = usuario?.role === "PROFESSOR" ? (usuario as Professor) : null;
  const estudante = usuario?.role === "ESTUDANTE" ? (usuario as Estudante) : null;

  const {
    register,
    handleSubmit,
    control,
    watch,
  } = useForm({
    resolver: yupResolver(schemaEditarPerfil),
    defaultValues: {
      nome: usuario?.nome || "",
      dataNascimento: usuario?.dataNascimento || "",
      genero: usuario?.genero || "",
      matricula: estudante?.matricula || "",
      curso: String(estudante?.curso?.id || ""),
      semestre: String(estudante?.semestre || ""),
      idLattes: professor?.idLattes || "",
    },
    context: {
      estudante: !!estudante,
      professor: !!professor,
    },
  });

  const cursoSelecionado = watch("curso");
  const [semestresDisponiveis, setSemestresDisponiveis] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Atualiza os semestres disponíveis dinamicamente
  useEffect(() => {
    const curso = cursos.find((c) => String(c.value) === String(cursoSelecionado));
    if (curso) {
      const lista = Array.from({ length: curso.semestres }, (_, i) => ({
        value: i + 1,
        label: `${i + 1}º Semestre`,
      }));
      setSemestresDisponiveis(lista);
    } else {
      setSemestresDisponiveis([]);
    }
  }, [cursoSelecionado, cursos]);

  const onSubmit = (data: any) => {
    const base = {
      id: usuario?.id,
      nome: data.nome,
      dataNascimento: data.dataNascimento,
      genero: data.genero,
    };

    if (estudante) {
      const estudantePayload = {
        ...base,
        matricula: data.matricula,
        curso: Number(data.curso),
        semestre: Number(data.semestre),
      };
      onSalvarPerfil(estudantePayload);
    } else if (professor) {
      const professorPayload = {
        ...base,
        idLattes: data.idLattes,
      };
      onSalvarPerfil(professorPayload);
    } else {
      onSalvarPerfil(base);
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Editar Perfil</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="nome"
            control={control}
            render={({ field, fieldState }) => (
              <InputAuth
                label="Nome Completo"
                type="text"
                placeholder="Digite seu nome"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="dataNascimento"
            control={control}
            render={({ field, fieldState }) => (
              <InputAuth
                label="Data de nascimento"
                type="date"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="genero"
            control={control}
            render={({ field, fieldState }) => (
              <SelectAuth
                name="genero"
                text="Gênero"
                options={generos}
                selected={field.value}
                onChange={field.onChange}
                placeholder="Selecione um gênero"
                error={fieldState.error?.message}
              />
            )}
          />

          {estudante && (
            <>
              <Controller
                name="matricula"
                control={control}
                render={({ field, fieldState }) => (
                  <InputAuth
                    label="Matrícula"
                    type="number"
                    placeholder="Digite sua matrícula"
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="curso"
                control={control}
                render={({ field, fieldState }) => (
                  <SelectAuth
                    name="curso"
                    text="Curso"
                    options={cursos}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Selecione um curso"
                    error={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="semestre"
                control={control}
                render={({ field }) => (
                  <SelectAuth
                    name="semestre"
                    text="Semestre"
                    options={semestresDisponiveis}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Selecione um semestre"
                  />
                )}
              />
            </>
          )}

          {professor && (
            <Controller
              name="idLattes"
              control={control}
              render={({ field, fieldState }) => (
                <InputAuth
                  label="ID Lattes"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
          )}

          <ButtonAuth type="button" text="Cancelar" theme="secondary" onClick={handleCancelar} disabled={isLoading} />
          <ButtonAuth type="submit" text="Salvar" theme="primary" loading={isLoading} />
        </form>
      </div>
    </div>,
    document.body
  );
}
