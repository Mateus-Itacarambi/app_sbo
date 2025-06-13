import ButtonAuth from "@/components/ButtonAuth";
import InputAuth from "../../InputAuth";
import Modal from "../Modal";
import { useState } from "react";

interface ModalEstudanteTemaProps {
  titulo: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent, matricula: string) => void;
  isLoading: boolean;
  textoBotao: string;
}

export default function ModalEstudanteTema({ titulo, onClose, onSubmit, isLoading, textoBotao }: ModalEstudanteTemaProps) {
  const [matricula, setMatricula] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    onSubmit(e, matricula);
  };

  return (
    <Modal onClose={onClose}>
      <h2>{titulo}</h2>
      <form name="adicionar_estudante" onSubmit={handleSubmit}>
        <InputAuth
          label="Matrícula"
          type="text"
          placeholder="Matrícula do estudante"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem"}}>
          <ButtonAuth text="Cancelar" type="button" theme="secondary" onClick={onClose} margin="0" loading={isLoading}/>
          <ButtonAuth text={textoBotao} type="submit" theme="primary"  margin="0" loading={isLoading}/>
        </div>
      </form>
    </Modal>
  );
}
