"use client";

import { useEffect, useState } from "react";
import styles from "./modalAreaInteresse.module.scss";
import BadgeAreaInteresse from "./BadgeAreaInteresse";
import { Curso, CursoProfessor } from "@/types";
import ReactDOM from "react-dom";
import ButtonAuth from "@/components/ButtonAuth";

interface ModalProps {
  todosCursos: CursoProfessor[];
  cursosSelecionados: CursoProfessor[];
  onCancelar: () => void;
  onAdicionar: (selecionadas: CursoProfessor[]) => void;
  isLoading: boolean;
}

export default function ModalAreaInteresse({ todosCursos, cursosSelecionados, onCancelar, onAdicionar, isLoading }: ModalProps) {
  const [busca, setBusca] = useState("");
  const [selecionadas, setSelecionadas] = useState<CursoProfessor[]>([]);

  useEffect(() => {
    setSelecionadas(cursosSelecionados);
  }, [cursosSelecionados]);

  const filtrarAreas = todosCursos
  .filter((curso) => curso.nome.toLowerCase().includes(busca.toLowerCase()))
  .sort((a, b) => a.nome.localeCompare(b.nome));

  const toggleSelecao = (curso: CursoProfessor) => {
    setSelecionadas((prev) =>
      prev.some((a) => a.id === curso.id)
        ? prev.filter((a) => a.id !== curso.id)
        : [...prev, curso]
    );
  };

  return ReactDOM.createPortal (
    <div className={styles.overlay} onClick={onCancelar}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar Cursos</h2>
        <input
          type="text"
          placeholder="Curso"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className={styles.inputBusca}
        />

        <div className={styles.listaBadges}>
          {filtrarAreas.map((curso) => (
            <BadgeAreaInteresse
              key={curso.id}
              texto={curso.nome}
              ativo={selecionadas.some((a) => a.id === curso.id)}
              onClick={() => toggleSelecao(curso)}
            />
          ))}
        </div>

        <div className={styles.botoes}>
          <ButtonAuth 
            type="button" 
            text={"Cancelar"} 
            theme="secondary" 
            margin="0" 
            loading={isLoading} 
            onClick={onCancelar} 
          />
          <ButtonAuth 
            type="button" 
            text={"Adicionar"} 
            theme="primary" margin="0" 
            loading={isLoading} 
            onClick={() => onAdicionar(selecionadas)} 
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
