"use client";

import { useEffect, useState } from "react";
import styles from "./modalAreaInteresse.module.scss";
import BadgeAreaInteresse from "./BadgeAreaInteresse";
import { AreaInteresse } from "@/types";
import ReactDOM from "react-dom";
import ButtonAuth from "@/components/ButtonAuth";

interface ModalProps {
  todasAreas: AreaInteresse[];
  areasSelecionadas: AreaInteresse[];
  onCancelar: () => void;
  onAdicionar: (selecionadas: AreaInteresse[]) => void;
  isLoading: boolean;
}

export default function ModalAreaInteresse({ todasAreas, areasSelecionadas, onCancelar, onAdicionar, isLoading }: ModalProps) {
  const [busca, setBusca] = useState("");
  const [selecionadas, setSelecionadas] = useState<AreaInteresse[]>([]);

  useEffect(() => {
    setSelecionadas(areasSelecionadas);
  }, [areasSelecionadas]);

  const filtrarAreas = todasAreas
  .filter((area) => area.nome.toLowerCase().includes(busca.toLowerCase()))
  .sort((a, b) => a.nome.localeCompare(b.nome));

  const toggleSelecao = (area: AreaInteresse) => {
    setSelecionadas((prev) =>
      prev.some((a) => a.id === area.id)
        ? prev.filter((a) => a.id !== area.id)
        : [...prev, area]
    );
  };

  return ReactDOM.createPortal (
    <div className={styles.overlay} onClick={onCancelar}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar Áreas de Interesse</h2>
        <input
          type="text"
          placeholder="Área de Interesse"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className={styles.inputBusca}
        />

        <div className={styles.listaBadges}>
          {filtrarAreas.map((area) => (
            <BadgeAreaInteresse
              key={area.id}
              texto={area.nome}
              ativo={selecionadas.some((a) => a.id === area.id)}
              onClick={() => toggleSelecao(area)}
            />
          ))}
        </div>

        <div className={styles.botoes}>
          <ButtonAuth 
            type="button" 
            text={isLoading ? <span className="spinner"></span> : "Cancelar"} 
            theme="secondary" 
            margin="0" 
            loading={isLoading} 
            onClick={onCancelar} 
          />
          <ButtonAuth 
            type="button" 
            text={isLoading ? <span className="spinner"></span> : "Adicionar"} 
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
