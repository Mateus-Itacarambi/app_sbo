import { X, Search } from "lucide-react";
import ButtonAuth from "../ButtonAuth";
import styles from "./temasPage.module.scss";
import DropdownCheck from "../DropdownCheck";
import { useEffect, useState } from "react";
import { buscarProfessores } from "@/services";
import InputTags from "../InputTags";

interface Props {
  filtros: any;
  setFiltros: (f: any) => void;
  isLoading: boolean;
}

export default function FiltroProfessor({ filtros, setFiltros, isLoading }: Props) {
  const [professoresOptions, setProfessoresOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const carregarProfessores = async () => {
      const professores = await buscarProfessores();
      const opcoes = professores.map((p) => ({ value: p.nome, label: p.nome }));
      setProfessoresOptions(opcoes);
    };
    carregarProfessores();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const limparCampoTitulo = () => {
    setFiltros({ ...filtros, titulo: "" });
  };

  const handleChangeProfessores = (valores: string[]) => {
    setFiltros({ ...filtros, professor: valores });
  };

  const handleChangePalavrasChave = (valores: string[]) => {
    setFiltros({ ...filtros, palavrasChave: valores });
  };

  return (
    <aside className={styles.card_filtro}>
      <div className={styles.filtros}>
        <h2>Filtros</h2>

        <div className={styles.inputComIcone}>
          <input
            name="titulo"
            placeholder="Título"
            value={filtros.titulo}
            onChange={handleChange}
          />
          {filtros.titulo ? (
            <X className={styles.icone} onClick={limparCampoTitulo} />
          ) : (
            <Search className={styles.icone} />
          )}
        </div>

        <InputTags
          label="Palavras-chave"
          palavras={filtros.palavrasChave}
          setPalavras={handleChangePalavrasChave}
        />

        
        <DropdownCheck
          label="Professores"
          options={professoresOptions}
          selectedValues={filtros.professor}
          onChange={handleChangeProfessores}
        />
      </div>

      <ButtonAuth
        type="button"
        text="Cancelar"
        theme="secondary"
        margin="0"
        onClick={() =>
          setFiltros({ titulo: "", professor: "", palavrasChave: []})
        }
        loading={isLoading}
      />
    </aside>
  );
}
