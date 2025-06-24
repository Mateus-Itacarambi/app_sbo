import { Estudante, TemaDTO, UsuarioCompleto } from "@/types";
import { useForm, Controller } from "react-hook-form";
import ButtonAuth from "@/components/ButtonAuth";
import InputAuth from "../../InputAuth";
import Modal from "../Modal";
import { useTema } from "@/hooks";
import { useEffect } from "react";
import { schemaTema } from "@/utils/validacoesForm";
import { yupResolver } from "@hookform/resolvers/yup";

interface ModalTemaEstudanteProps {
  usuario: any;
  onClose: () => void;
  atualizarTema: (dados: TemaDTO) => void;
  cadastrarTema: (dados: TemaDTO) => void;
  onCancelar: () => void;
  isLoading: boolean;
}

export default function ModalTemaEstudante({ usuario, onClose, atualizarTema, cadastrarTema, onCancelar, isLoading }: ModalTemaEstudanteProps) {
    const { handleSubmit, control } = useForm<TemaDTO>({
      resolver: yupResolver(schemaTema),
      defaultValues: {
        titulo: (usuario as Estudante).tema?.titulo || "",
        palavrasChave: (usuario as Estudante).tema?.palavrasChave || "",
        descricao: (usuario as Estudante).tema?.descricao || "",
      }
    });
    
    const onSubmit = async (data: TemaDTO) => {
      if ((usuario as Estudante).tema) {
        atualizarTema(data);
      } else {
        cadastrarTema(data);
      }
    };

  return (
    <Modal onClose={onClose}>
        {(usuario as Estudante).tema ? (<h2>Editar Tema</h2>) : (<h2>Cadastrar Tema</h2>)}
        <form name="cadastro_estudante" onSubmit={handleSubmit(onSubmit)}>
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
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <ButtonAuth text="Cancelar" type="button" theme="secondary" onClick={onCancelar} disabled={isLoading} />
              <ButtonAuth text={"Salvar"} type="submit" theme="primary" loading={isLoading} />
          </div>
        </form>
    </Modal>
  );
}
