import {useEffect} from "react";
import ReactDOM from "react-dom";
import styles from "./modalEditarPerfil.module.scss";
import InputAuth from "@/components/InputAuth";
import SelectAuth from "@/components/SelectAuth";
import ButtonAuth from "@/components/ButtonAuth";
import { Estudante, generos, Professor, UsuarioCompleto } from "@/types";


interface ModalEditarPerfilProps {
  usuario: any;
  formData: any;
  cursos: any[];
  semestresDisponiveis: any[];
  onClose: () => void;
  onSalvarPerfil: (e: React.FormEvent, formData: any) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleGeneroChange: (genero: string) => void;
  handleCursoChange: (cursoId: string) => void;
  handleSemestreChange: (semestre: string) => void;
  handleCancelar: () => void;
  isLoading: boolean;
}

export default function ModalEditarPerfil({ usuario, formData, cursos, semestresDisponiveis, onClose, onSalvarPerfil, handleChange, handleGeneroChange, handleCursoChange, handleSemestreChange, handleCancelar, isLoading }: ModalEditarPerfilProps) {
  const professor = usuario?.role === "PROFESSOR" ? (usuario as Professor) : null;
  const estudante = usuario?.role === "ESTUDANTE" ? (usuario as Estudante) : null;
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  
  const handleSubmit = (e: React.FormEvent) => {
    onSalvarPerfil(e, formData);
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Editar Perfil</h2>
        <form onSubmit={handleSubmit}>          
          <InputAuth label="Nome Completo" name="nome" type="text" value={formData.nome} onChange={handleChange}/>
          <InputAuth label="Data de Nascimento" name="dataNascimento" type="date" value={formData.dataNascimento} onChange={handleChange}/>
          <SelectAuth text="Gênero" options={generos} onChange={handleGeneroChange} selected={formData.genero} name="genero" />
          
          {estudante && (
            <>
              <InputAuth label="Matrícula" name="matricula" type="number" value={formData.matricula} onChange={handleChange}/>
              <SelectAuth options={cursos} onChange={handleCursoChange} text="Curso" selected={formData.curso} name="curso" />
              <SelectAuth options={semestresDisponiveis} onChange={handleSemestreChange} text="Semestre" selected={formData.semestre} name="semestre" />
            </>
          )}

          {professor && (
            <>
              <InputAuth label="ID Lattes" name="idLattes" type="number" value={formData.idLattes} onChange={handleChange}/>
            </>
          )}

          <ButtonAuth type="button" text="Cancelar" theme="secondary" onClick={handleCancelar} loading={isLoading} />
          <ButtonAuth type="submit" text="Salvar" theme="primary" loading={isLoading}/>
        </form>
      </div>
    </div>,
    document.body
  );
}
