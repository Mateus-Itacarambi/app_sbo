import styles from "../modal.module.scss";
import { useForm, Controller } from "react-hook-form";
import { TemaDTO } from "@/types";
import Modal from "../Modal";
import InputAuth from "../../InputAuth";
import ButtonAuth from "@/components/ButtonAuth";
import { schemaTema } from "@/utils/validacoesForm";
import { yupResolver } from "@hookform/resolvers/yup";

interface ModalTemaProfessorProps {
  onClose: () => void;
  onSalvar: (tema: TemaDTO) => void;
  onCancelar: () => void;
  isLoading: boolean;
}

export default function ModalTemaProfessor({ onSalvar, onClose, onCancelar, isLoading }: ModalTemaProfessorProps) {
  const { handleSubmit, control } = useForm<TemaDTO>({
    resolver: yupResolver(schemaTema),
  });

  return (
    <Modal onClose={onClose}>
      <h2>Adicionar Tema</h2>

      <form onSubmit={handleSubmit(onSalvar)}>
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

        <div className={styles.flex}>
          <ButtonAuth text="Cancelar" type="button" theme="secondary" onClick={onCancelar} margin="0" disabled={isLoading} />
          <ButtonAuth type="submit" text={"Adicionar Tema"} theme="primary" margin="0" loading={isLoading} />
        </div>
      </form>
    </Modal>
  );
}
