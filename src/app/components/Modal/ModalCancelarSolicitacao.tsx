import ButtonAuth from "@/components/ButtonAuth";
import InputAuth from "../InputAuth";
import Modal from "./Modal";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaMotivo } from "../../utils/validacoesForm";

interface ModalCancelarSolicitacaoProps {
  titulo: string;
  onClose: () => void;
  onSubmit: (idSolicitacao: number, motivo: string) => void;
  isLoading: boolean;
  textoBotao: string;
  idSolicitacao: number | null;
}

export default function ModalCancelarSolicitacao({ titulo, onClose, onSubmit, isLoading, textoBotao, idSolicitacao }: ModalCancelarSolicitacaoProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ motivo: string }>({
    resolver: yupResolver(schemaMotivo),
  });
  
  const handleFormSubmit = (data: any) => {
    if (idSolicitacao != null){
      onSubmit(idSolicitacao, data.motivo);
    }
      onClose()
  };

  return (
    <Modal onClose={onClose}>
      <h2>{titulo}</h2>
      <form name="cancelar_rejeitar_solicitacao" onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          name="motivo"
          control={control}
          render={({ field, fieldState }) => (
            <InputAuth
              label="Motivo"
              type="textarea"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem"}}>
          <ButtonAuth text="Cancelar" type="button" theme="secondary" onClick={onClose} margin="1rem 0 0 0" disabled={isLoading}/>
          <ButtonAuth text={isLoading ? <span className="spinner"></span> : textoBotao} type="submit" theme="primary"  margin="1rem 0 0 0" loading={isLoading}/>
        </div>
      </form>
    </Modal>
  );
}
