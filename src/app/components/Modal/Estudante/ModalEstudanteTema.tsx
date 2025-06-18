import ButtonAuth from "@/components/ButtonAuth";
import InputAuth from "../../InputAuth";
import Modal from "../Modal";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEstudante } from "../../../utils/validacoesForm";

interface ModalEstudanteTemaProps {
  titulo: string;
  onClose: () => void;
  onSubmit: (matricula: string) => void;
  isLoading: boolean;
  textoBotao: string;
}

export default function ModalEstudanteTema({ titulo, onClose, onSubmit, isLoading, textoBotao }: ModalEstudanteTemaProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ matricula: string }>({
    resolver: yupResolver(schemaEstudante),
  });

  const handleFormSubmit = (data: { matricula: string }) => {
    onSubmit(data.matricula);
  };

  return (
    <Modal onClose={onClose}>
      <h2>{titulo}</h2>
      <form name="adicionar_estudante" onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          name="matricula"
          control={control}
          render={({ field, fieldState }) => (
            <InputAuth
              label="Matrícula"
              type="number"
              placeholder="Matrícula do estudante"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem"}}>
          <ButtonAuth text="Cancelar" type="button" theme="secondary" onClick={onClose} margin="0" disabled={isLoading}/>
          <ButtonAuth text={textoBotao} type="submit" theme="primary"  margin="0" loading={isLoading}/>
        </div>
      </form>
    </Modal>
  );
}
