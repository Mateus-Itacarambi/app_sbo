import { X, Search } from "lucide-react";
import ButtonAuth from "../ButtonAuth";
import styles from "./professoresPage.module.scss";
import DropdownCheck from "../DropdownCheck";
import { AreaInteresse } from "@/types";
import { useEffect, useState } from "react";
import { buscarAreasInteresse, buscarCursos } from "@/services";

interface Props {
  filtros: any;
  setFiltros: (f: any) => void;
  isLoading: boolean;
}

export default function FiltroProfessor({ filtros, setFiltros, isLoading }: Props) {
  const [areasOptions, setAreasOptions] = useState<{ value: string; label: string }[]>([]);
  const [cursosOptions, setCursosOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const carregarAreas = async () => {
      const areas = await buscarAreasInteresse();
      const opcoes = areas.map((a) => ({ value: a.nome, label: a.nome }));
      setAreasOptions(opcoes);
    };
    carregarAreas();

    
    const carregarCursos = async () => {
      const cursos = await buscarCursos();
      const opcoes = cursos.map((c) => ({ value: c.nome, label: c.nome }));
      setCursosOptions(opcoes);
    };
    carregarCursos();
  }, []);

  const disponibilidadeOptions = [
  { value: "DISPONIVEL", label: "Disponível" },
  { value: "INDISPONIVEL", label: "Indisponível" }
];


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const limparCampoNome = () => {
    setFiltros({ ...filtros, nome: "" });
  };

  const handleChangeAreas = (valores: string[]) => {
    setFiltros({ ...filtros, areaInteresse: valores });
  };

  const handleChangeCursos = (valores: string[]) => {
    setFiltros({ ...filtros, curso: valores });
  };

  const handleChangeDisponibilidade = (valores: string[]) => {
    setFiltros({ ...filtros, disponibilidade: valores });
  };

  return (
    <aside className={styles.card_filtro}>
      <div className={styles.filtros}>
        <h2>Filtros</h2>

        <div className={styles.inputComIcone}>
          <input
            name="nome"
            placeholder="Nome"
            value={filtros.nome}
            onChange={handleChange}
          />
          {filtros.nome ? (
            <X className={styles.icone} onClick={limparCampoNome} />
          ) : (
            <Search className={styles.icone} />
          )}
        </div>
        
        <DropdownCheck
          label="Áreas de interesse"
          options={areasOptions}
          selectedValues={filtros.areaInteresse}
          onChange={handleChangeAreas}
        />
        
        <DropdownCheck
          label="Cursos"
          options={cursosOptions}
          selectedValues={filtros.curso}
          onChange={handleChangeCursos}
        />
        
        <DropdownCheck
          label="Disponibilidade"
          options={disponibilidadeOptions}
          selectedValues={filtros.disponibilidade}
          onChange={handleChangeDisponibilidade}
          search={false}
        />
      </div>

      <ButtonAuth
        type="button"
        text="Cancelar"
        theme="secondary"
        margin="0"
        onClick={() =>
          setFiltros({ nome: "", curso: "", disciplina: "", disponibilidade: "", areaInteresse: "" })
        }
        loading={isLoading}
      />
    </aside>
  );
}
