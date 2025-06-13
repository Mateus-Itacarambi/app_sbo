import ButtonAuth from "@/components/ButtonAuth";
import InputAuth from "../InputAuth";
import Modal from "./Modal";
import { useState } from "react";

interface ModalCancelarSolicitacaoProps {
  titulo: string;
  onClose: () => void;
  onSubmit: (idSolicitacao: number, motivo: string) => void;
  isLoading: boolean;
  textoBotao: string;
  idSolicitacao: number | null;
}

export default function ModalCancelarSolicitacao({ titulo, onClose, onSubmit, isLoading, textoBotao, idSolicitacao }: ModalCancelarSolicitacaoProps) {
  const [motivo, setMotivo] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    if (idSolicitacao != null){
      e.preventDefault();
      onSubmit(idSolicitacao, motivo);
    }
      onClose()
  };

  return (
    <Modal onClose={onClose}>
      <h2>{titulo}</h2>
      <form name="cancelar_rejeitar_solicitacao" onSubmit={handleSubmit}>
        <InputAuth
          label="Motivo"
          type="textarea"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem"}}>
          <ButtonAuth text="Cancelar" type="button" theme="secondary" onClick={onClose} margin="1rem 0 0 0" loading={isLoading}/>
          <ButtonAuth text={isLoading ? <span className="spinner"></span> : textoBotao} type="submit" theme="primary"  margin="1rem 0 0 0" loading={isLoading}/>
        </div>
      </form>
    </Modal>
  );
}
