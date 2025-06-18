import styles from "../modal.module.scss";
import { useForm, Controller } from "react-hook-form";
import { FormacaoDTO } from "@/types";
import Modal from "../Modal";
import InputAuth from "../../InputAuth";
import ButtonAuth from "@/components/ButtonAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaFormacao } from "@/utils/validacoesForm";

interface ModalFormacaoProps {
  onClose: () => void;
  onSalvar: (formacao: FormacaoDTO) => void;
  onCancelar: () => void;
  isLoading: boolean;
}

export default function ModalFormacao({ onSalvar, onClose, onCancelar, isLoading }: ModalFormacaoProps) {
    const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<FormacaoDTO>({
      resolver: yupResolver(schemaFormacao),
    });

  return (
    <Modal onClose={onClose}>
      <h2>Adicionar Formação</h2>

      <form onSubmit={handleSubmit(onSalvar)}>
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
                onChange={field.onChange}
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
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />

          <ButtonAuth text="Cancelar" type="button" theme="secondary" onClick={onCancelar} margin="0" disabled={isLoading} />
          <ButtonAuth type="submit" text={"Adicionar Formação"} theme="primary" margin="0" loading={isLoading} />
        </div>
      </form>
    </Modal>
  );
}
