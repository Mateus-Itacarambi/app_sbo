import ButtonAuth from "@/components/ButtonAuth";
import Modal from "./Modal";

interface ModalConfirmarProps {
  onClose: () => void;
  handleRemover: () => void;
  isLoading: boolean;
  titulo?: string;
  descricao?: string;
}

export default function ModalConfirmar({ onClose, handleRemover, isLoading, titulo, descricao }: ModalConfirmarProps) {
  return (
    <Modal onClose={onClose}>
        <h2>{titulo}</h2>
        <p>{descricao}</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <ButtonAuth text="Cancelar" type="button" theme="secondary" onClick={onClose} margin="0" loading={isLoading}/>
        <ButtonAuth text={"Confirmar"} type="button" onClick={handleRemover} theme="primary"  margin="0" loading={isLoading}/>
        </div>
    </Modal>
  );
}
