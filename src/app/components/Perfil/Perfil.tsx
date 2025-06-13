"use client";

import { useEffect, useState } from "react";
import styles from "./perfil.module.scss";

import Loading from "@/components/Loading/loading";
import Alerta from "@/components/Alerta";
import ModalEditarPerfil from "@/components/Modal/ModalEditarPerfil";
import ModalTemaEstudante from "@/components/Modal/Estudante/ModalTemaEstudante";
import ModalEstudanteTema from "@/components/Modal/Estudante/ModalEstudanteTema";
import ModalFormacao from "../Modal/Professor/ModalFormacao";
import ModalTemaProfessor from "@/components/Modal/Professor/ModalTemaProfessor";

import PerfilCabecalho from "@/components/Perfil/PerfilCabecalho";
import CardInfo from "@/components/Perfil/CardInfo";
import PerfilEstudante from "@/components/Perfil/Estudante/PerfilEstudante";
import PerfilProfessor from "./Professor/PerfilProfessor";

import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { useModal, useFormulario, useCursos, useOrientador, useTemaActions, usePerfilActions, useFormacaoActions, useFormacoes, useTemas, useAreaInteresseActions } from "@/hooks";
import { AreaInteresse, Curso, CursoProfessor, Estudante, Formacao, FormacaoDTO, Professor, TemaDTO, UsuarioCompleto } from "@/types";
import ModalGerenciarFormacoes from "../Modal/Professor/ModalGerenciarFormacoes";
import ModalGerenciarTemas from "../Modal/Professor/ModalGerenciarTemas";
import { useAreasInteresse } from "@/hooks/useAreasInteresse";
import ModalAreaInteresse from "../Modal/Professor/ModalAreaInteresse";
import ModalCurso from "../Modal/Professor/ModalCurso";
import { useCursosActions } from "@/hooks/useCursosActions";
import { useSolicitacaoActions } from "@/hooks/useSolicitacaoActions";

interface PerfilProps {
  usuarioVisualizado: Estudante | Professor | null;
}

export default function Perfil({ usuarioVisualizado }: PerfilProps) {
  const [UsuarioCompleto, setUsuarioCompleto] = useState<UsuarioCompleto | null>(null);

  useEffect(() => {
  const buscarDadosCompletos = async () => {
    const res = await fetch("http://localhost:8080/auth/me", {
      credentials: "include",
    });
    const data = await res.json();
    setUsuarioCompleto(data);
  };

  buscarDadosCompletos();
}, []);


  if (!usuarioVisualizado) return <p>Usuário não encontrado.</p>;

  const isMeuPerfil = UsuarioCompleto?.id === usuarioVisualizado.id;

  const professor = usuarioVisualizado?.role === "PROFESSOR" ? (usuarioVisualizado as Professor) : null;
  const estudante = usuarioVisualizado?.role === "ESTUDANTE" ? (usuarioVisualizado as Estudante) : null;

  const { erro, sucesso, isLoading, mostrarAlerta } = useAlertaTemporarioContext();

  const modal = useModal(usuarioVisualizado);
  const form = useFormulario({});
  const cursos = useCursos(usuarioVisualizado, form.formData);
  const { orientador } = useOrientador(usuarioVisualizado);
  const perfilActions = usePerfilActions(usuarioVisualizado, form.formData);
  const temaActions = useTemaActions(usuarioVisualizado);
  const formacaoActions = useFormacaoActions(usuarioVisualizado);
  const areaInteresseActions = useAreaInteresseActions(usuarioVisualizado);
  const cursoActions = useCursosActions(usuarioVisualizado);
  const solicitacaoActions = useSolicitacaoActions();

  const { formacoes, setFormacoes } = useFormacoes();
  const { temas, setTemas } = useTemas();
  const { areasInteresse, setAreasInteresse } = useAreasInteresse();
  const [ areasDisponiveis, setAreasDisponiveis ] = useState<AreaInteresse[]>([]);
  const [ cursosDisponiveis, setCursosDisponiveis ] = useState<CursoProfessor[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/areasInteresse/lista`)
      .then(res => res.json())
      .then((data: AreaInteresse[]) => setAreasDisponiveis(data));
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cursos/lista`)
      .then(res => res.json())
      .then((data: Curso[]) => setCursosDisponiveis(data));
  }, []);

  useEffect(() => {
    resetFormData();
    if (usuarioVisualizado) {
      if (usuarioVisualizado.role === "PROFESSOR") {
        const professor = usuarioVisualizado as Professor;
        setFormacoes(professor.formacoes || []);
        setTemas(professor.temas || []);
        setAreasInteresse(professor.areasDeInteresse || []);
        cursos.setCursosProfessor(professor.cursos || []);
      }
    }
  }, [usuarioVisualizado]);

  const resetFormData = () => {
    if (usuarioVisualizado) {
      form.setFormData({
        ...usuarioVisualizado,
        curso: estudante?.curso?.id || "",
      });

      const cursoOriginal = cursos.cursos.find(c => c.id === estudante?.curso?.id);
      if (cursoOriginal) {
        const semestres = Array.from({ length: cursoOriginal.semestres }, (_, i) => ({
          value: i + 1,
          label: `${i + 1}º Semestre`,
        }));
        cursos.setSemestresDisponiveis(semestres);
      } else {
        cursos.setSemestresDisponiveis([]);
      }
    }
  };

  const handleCancelar = () => {
    resetFormData();
    modal.setModalEditarPerfil(false);
    modal.setModalFormacao(false);
  };

  const cadastrarTema = async (e: React.FormEvent, titulo: string, palavrasChave: string, descricao: string) => {
    await temaActions.handleCadastrarTema(e, { titulo: titulo, palavrasChave: palavrasChave, descricao: descricao });
  };

  const atualizarTema = async (e: React.FormEvent, titulo: string, palavrasChave: string, descricao: string) => {
    await temaActions.handleAtualizarTema(e, { titulo: titulo, palavrasChave: palavrasChave, descricao: descricao });
  };

  const removerTema = async (temaId: number) => {
    await temaActions.handleRemoverTema(temaId);
  };

  const adicionarEstudanteTema = async (e: React.FormEvent, matricula: string) => {
    await temaActions.handleAdicionarEstudanteTema(e, matricula);
  };

  const removerEstudanteTema = async (e: React.FormEvent, matricula: string) => {
    await temaActions.handleRemoverEstudanteTema(e, matricula);
  };

  const atualizarPerfil = async (e: React.FormEvent) => {
    await perfilActions.handleAtualizarPerfil(e);
  };

  const adicionarFormacao = async (formacao: FormacaoDTO) => {
    await formacaoActions.handleAdicionarFormacao(formacao);
  };

  const atualizarFormacao = async (formacaoId: number, formacao: FormacaoDTO) => {
    await formacaoActions.handleAtualizarFormacao(formacaoId, formacao);

    setFormacoes((prev) => prev.map((f) => (f.id === formacaoId ? { ...f, ...formacao } : f)));
  };

  const removerFormacao = async (formacaoId: number) => {
    await formacaoActions.handleRemoverFormacao(formacaoId);

    setFormacoes((prev) => prev.filter((f) => f.id !== formacaoId));
  };

  const adicionarTema = async (tema: TemaDTO) => {
    await temaActions.handleAdicionarTema(tema);
  };

  const atualizarTemaProfessor = async (temaId: number, tema: TemaDTO) => {
    await temaActions.handleAtualizarTemaProfessor(temaId, tema);

    setTemas((prev) =>
      prev.map((t) => (t.id === temaId ? { ...t, ...tema } : t))
    );
  };

  const removerTemaProfessor = async (temaId: number) => {
    await temaActions.handleRemoverTemaProfessor(temaId);

    setTemas((prev) => prev.filter((t) => t.id !== temaId));
  };

  const adicionarAreaInteresse = async (areasInteresse: AreaInteresse[]) => {
    await areaInteresseActions.handleAdicionarAreasInteresse(areasInteresse);
  };

  const removerAreaInteresse = async (areaInteresseId: number) => {
    await areaInteresseActions.handleRemoverAreaInteresse(areaInteresseId);

    setAreasInteresse((prev) => prev.filter((a) => a.id !== areaInteresseId));
  };

  const adicionarCurso = async (cursos: CursoProfessor[]) => {
    await cursoActions.handleAdicionarCurso(cursos);
  };

  const removerCurso = async (cursoId: number) => {
    await cursoActions.handleRemoverCurso(cursoId);

    cursos.setCursosProfessor((prev) => prev.filter((c) => c.id !== cursoId));
  };

  if (!usuarioVisualizado) return <Loading />;

  return (
    <div className={styles.main}>
      {mostrarAlerta && (
        <Alerta text={erro || sucesso} theme={erro ? "erro" : "sucesso"} top="10rem" />
      )}
      <div className={styles.container}>
        <div className={styles.card_container}>
            <PerfilCabecalho usuario={usuarioVisualizado} onEditar={() => modal.setModalEditarPerfil(true)} mostrarBotoes={isMeuPerfil}/>
            
            {isMeuPerfil && (
              <>
                <CardInfo titulo="Data de Nascimento" texto={new Date(`${usuarioVisualizado.dataNascimento}T12:00:00`).toLocaleDateString("pt-BR")} />
                <CardInfo titulo="Gênero" texto={usuarioVisualizado.genero} />
              </>
            )}

            {estudante && (
              <PerfilEstudante
                estudante={estudante}
                orientador={orientador}
                onEditarTema={modal.handleAbrirModalTema}
                onRemoverTema={removerTema}
                onAdicionarEstudante={() => modal.setModalAdicionarEstudanteTema(true)}
                onRemoverEstudante={() => modal.setModalRemoverEstudanteTema(true)}
                onAdicionarTema={() => modal.setModalTemaEstudante(true)}
                isMeuPerfil={isMeuPerfil}
                isLoading={isLoading}
              />
            )}

            {professor && (
              <PerfilProfessor
                professor={professor}
                onGerenciarFormacao={modal.handleAbrirModalFormacao}
                onGerenciarTemas={modal.handleAbrirModalTemas}
                onAdicionarFormacao={() => modal.setModalFormacao(true)}
                onAdicionarAreaInteresse={() => modal.setModalAreaInteresse(true)}
                onAdicionarTema={() => modal.setModalTemaProfessor(true)}
                onAdicionarCurso={() => modal.setModalCurso(true)}
                isMeuPerfil={isMeuPerfil}
                formacoes={formacoes}
                temas={temas}
                areasInteresse={areasInteresse}
                onRemoverAreaInteresse={removerAreaInteresse}
                onRemoverCurso={removerCurso}
                cursos={cursos.cursosProfessor}
                isLoading={isLoading}
              />
            )}

        </div>
      </div>
      {modal.modalTemaEstudante && (
        <ModalTemaEstudante
          usuario={usuarioVisualizado}
          onClose={() => modal.setModalTemaEstudante(false)}
          atualizarTema={atualizarTema}
          cadastrarTema={cadastrarTema}
          onCancelar={() => modal.setModalTemaEstudante(false)}
          isLoading={isLoading}
        />
      )}
      
      {modal.modalTemaProfessor && (
        <ModalTemaProfessor
          onSalvar={adicionarTema}
          onClose={() => modal.setModalTemaProfessor(false)}
          onCancelar={() => modal.setModalTemaProfessor(false)}
          isLoading={isLoading}
        />
      )}
      
      {modal.modalFormacoes && (
        <ModalGerenciarFormacoes
          formacoesIniciais={formacoes}
          onAtualizar={atualizarFormacao}
          onRemove={removerFormacao}
          onClose={() => modal.setModalFormacoes(false)}
          isLoading={isLoading}
        />
      )}
      
      {modal.modalTemas && (
        <ModalGerenciarTemas
          temasIniciais={temas}
          onAtualizar={atualizarTemaProfessor}
          onRemove={removerTemaProfessor}
          onClose={() => modal.setModalTemas(false)}
          isLoading={isLoading}
        />
      )}
      
      {modal.modalFormacao && (
        <ModalFormacao
          onSalvar={adicionarFormacao}
          onClose={() => modal.setModalFormacao(false)}
          onCancelar={handleCancelar}
          isLoading={isLoading}
        />
      )}

      {modal.modalAreaInteresse && (
        <ModalAreaInteresse
          todasAreas={areasDisponiveis}
          areasSelecionadas={areasInteresse}
          onCancelar={() => modal.setModalAreaInteresse(false)}
          onAdicionar={adicionarAreaInteresse}
          isLoading={isLoading}
        />
      )}
      {modal.modalCurso && (
        <ModalCurso
          todosCursos={cursosDisponiveis}
          cursosSelecionados={cursos.cursosProfessor}
          onCancelar={() => modal.setModalCurso(false)}
          onAdicionar={adicionarCurso}
          isLoading={isLoading}
        />
      )}

      {(modal.modalAdicionarEstudanteTema || modal.modalRemoverEstudanteTema) && (
        <ModalEstudanteTema
          titulo={modal.modalAdicionarEstudanteTema ? "Adicionar Estudante ao Tema" : "Remover Estudante do Tema"}
          onClose={() => {
            modal.setModalAdicionarEstudanteTema(false);
            modal.setModalRemoverEstudanteTema(false);
          }}
          onSubmit={modal.modalAdicionarEstudanteTema ? adicionarEstudanteTema : removerEstudanteTema}
          isLoading={isLoading}
          textoBotao={modal.modalAdicionarEstudanteTema ? "Adicionar" : "Remover"}
        />
      )}

      {modal.modalEditarPerfil && (
        <ModalEditarPerfil 
          usuario={usuarioVisualizado}
          formData={form.formData}
          cursos={cursos.cursos}
          semestresDisponiveis={cursos.semestresDisponiveis}
          onClose={() => modal.setModalEditarPerfil(false)}
          onSalvarPerfil={atualizarPerfil}
          handleChange={form.handleChange}
          handleGeneroChange={form.handleGeneroChange}
          handleCursoChange={form.handleCursoChange}
          handleSemestreChange={form.handleSemestreChange}
          handleCancelar={handleCancelar}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}