import { Estudante, Formacao, Tema } from '@/types';
import { useState } from 'react';
import { useTema } from './useTema';
import { useFormacao } from './useFormacao';
import { useTemas } from './useTemas';

export const useModal = (usuario: any) => {
  const [modalTemaEstudante, setModalTemaEstudante] = useState(false);
  const [modalEditarPerfil, setModalEditarPerfil] = useState(false);
  const [modalAdicionarEstudanteTema, setModalAdicionarEstudanteTema] = useState(false);
  const [modalRemoverEstudanteTema, setModalRemoverEstudanteTema] = useState(false);
  const [modalConfirmarRemocaoTema, setModalConfirmarRemocaoTema] = useState(false);

  const [modalFormacao, setModalFormacao] = useState(false);
  const [modalFormacoes, setModalFormacoes] = useState(false);
  const [modalAdicionarFormacao, setModalAdicionarFormacao] = useState(false);
  const [modalConfirmarRemocaoFormacao, setModalConfirmarRemocaoFormacao] = useState(false);
  const [modalTemaProfessor, setModalTemaProfessor] = useState(false);
  const [modalTemas, setModalTemas] = useState(false);
  const [modalAreaInteresse, setModalAreaInteresse] = useState(false);
  const [modalCurso, setModalCurso] = useState(false);

  const {
    setTemaTitulo,
    setTemaDescricao,
    setTemaPalavrasChave
  } = useTema();

  const formacao = useFormacao();

  const handleAbrirModalTema = () => {
    const tema = (usuario as Estudante)?.tema;
    if (tema) {
      setTemaTitulo(tema.titulo || "");
      setTemaDescricao(tema.descricao || "");
      setTemaPalavrasChave(tema.palavrasChave || "");
    } else {
      setTemaTitulo("");
      setTemaDescricao("");
      setTemaPalavrasChave("");
    }
    setModalTemaEstudante(true);
  };
  
  const handleAbrirModalFormacao = (formacaoSelecionada?: Formacao) => {
    if (formacaoSelecionada) {
      formacao.setCurso(formacaoSelecionada.curso || "");
      formacao.setInstituicao(formacaoSelecionada.instituicao || "");
      formacao.setTitulo(formacaoSelecionada.titulo || "");
      formacao.setAnoInicio(String(formacaoSelecionada.anoInicio || ""));
      formacao.setAnoFim(String(formacaoSelecionada.anoFim || ""));
    } else {
      formacao.setCurso("");
      formacao.setInstituicao("");
      formacao.setTitulo("");
      formacao.setAnoInicio("");
      formacao.setAnoFim("");
    }
    setModalFormacoes(true);
  };
  
  const handleAbrirModalTemas = (temaSelecionada?: Tema) => {
    if (temaSelecionada) {
      setTemaTitulo(temaSelecionada.titulo || "");
      setTemaPalavrasChave(temaSelecionada.palavrasChave || "");
      setTemaDescricao(temaSelecionada.descricao || "");
    } else {
      setTemaTitulo("");
      setTemaPalavrasChave("");
      setTemaDescricao("");
    }
    setModalTemas(true);
  };
  
  return {
    modalTemaEstudante,
    setModalTemaEstudante,
    modalTemaProfessor,
    setModalTemaProfessor,
    modalEditarPerfil,
    setModalEditarPerfil,
    modalAdicionarEstudanteTema,
    setModalAdicionarEstudanteTema,
    modalRemoverEstudanteTema,
    setModalRemoverEstudanteTema,
    modalConfirmarRemocaoTema,
    setModalConfirmarRemocaoTema,
    handleAbrirModalTema,
    modalFormacao, 
    setModalFormacao,
    modalFormacoes, 
    setModalFormacoes,
    modalAdicionarFormacao, 
    setModalAdicionarFormacao,
    handleAbrirModalFormacao,
    modalConfirmarRemocaoFormacao,
    setModalConfirmarRemocaoFormacao,
    modalTemas,
    setModalTemas,
    handleAbrirModalTemas,
    modalAreaInteresse, 
    setModalAreaInteresse,
    modalCurso, 
    setModalCurso,
  };
};