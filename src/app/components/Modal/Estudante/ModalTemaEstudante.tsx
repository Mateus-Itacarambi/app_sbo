import { Estudante, UsuarioCompleto } from "@/types";
import ButtonAuth from "@/components/ButtonAuth";
import InputAuth from "../../InputAuth";
import Modal from "../Modal";
import { useTema } from "@/hooks";
import { useEffect } from "react";

interface ModalTemaEstudanteProps {
  usuario: any;
  onClose: () => void;
  atualizarTema: (e: React.FormEvent, titulo: string, palavrasChave: string, descricao: string) => void;
  cadastrarTema: (e: React.FormEvent, titulo: string, palavrasChave: string, descricao: string) => void;
  onCancelar: () => void;
  isLoading: boolean;
}

export default function ModalTemaEstudante({ usuario, onClose, atualizarTema, cadastrarTema, onCancelar, isLoading }: ModalTemaEstudanteProps) {
    const { temaTitulo, setTemaTitulo, temaPalavrasChave, setTemaPalavrasChave, temaDescricao, setTemaDescricao } = useTema();

    useEffect(() => {
      if ((usuario as Estudante).tema) {
        setTemaTitulo((usuario as Estudante).tema?.titulo || "");
        setTemaPalavrasChave((usuario as Estudante).tema?.palavrasChave || "");
        setTemaDescricao((usuario as Estudante).tema?.descricao || "");
      }
    }, [usuario]);
  
    const handleSubmit = (e: React.FormEvent) => {
      if ((usuario as Estudante).tema) {
        atualizarTema(e, temaTitulo, temaPalavrasChave, temaDescricao);
      } else {
        cadastrarTema(e, temaTitulo, temaPalavrasChave, temaDescricao);
      }
    };

  return (
    <Modal onClose={onClose}>
        {(usuario as Estudante).tema ? (<h2>Editar Tema</h2>) : (<h2>Cadastrar Tema</h2>)}
        <form name="cadastro_estudante" onSubmit={handleSubmit}>
          <InputAuth
              label="Título"
              type="text"
              placeholder="Título do tema"
              value={temaTitulo}
              onChange={(e) => setTemaTitulo(e.target.value)}
          />
          <InputAuth
              label="Palavras-chave"
              type="text"
              placeholder="Palavras-chave do tema"
              value={temaPalavrasChave}
              onChange={(e) => setTemaPalavrasChave(e.target.value)}
          />
          <InputAuth
              label="Descrição"
              type="textarea"
              placeholder="Descrição do tema"
              value={temaDescricao}
              onChange={(e) => setTemaDescricao(e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <ButtonAuth text="Cancelar" type="button" theme="secondary" onClick={onCancelar} loading={isLoading} />
              <ButtonAuth text={"Salvar"} type="submit" theme="primary" loading={isLoading} />
          </div>
        </form>
    </Modal>
  );
}
