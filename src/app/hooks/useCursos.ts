import { Curso, CursoProfessor } from '@/types';
import { useState, useEffect } from 'react';
import { useFormulario } from './useFormulario';


export const useCursos = (usuario: any, formData: any) => {
  const [cursos, setCursos] = useState<any[]>([]);
  const [semestresDisponiveis, setSemestresDisponiveis] = useState<{ value: number, label: string }[]>([]);
  const form = useFormulario({});

  const [cursosProfessor, setCursosProfessor] = useState<CursoProfessor[]>([]);
  const [cursosProfessorAtual, setCursosProfessorAtual] = useState<CursoProfessor>({
    id: 0,
    nome: "",
    slug: "",
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleEditar = (index: number) => {
    setCursosProfessorAtual(cursosProfessor[index]);
    setEditIndex(index);
  };

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cursos/lista`);
        if (!res.ok) throw new Error("Erro ao buscar cursos");

        const data = await res.json();
        const cursosMapeados = data.map((curso: any) => ({
          value: curso.id,
          label: curso.nome,
          semestres: curso.semestres,
        }));
        setCursos(cursosMapeados);
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      }
    };

    if (usuario?.role === "ESTUDANTE") {
      fetchCursos();
    }
  }, [usuario]);

  useEffect(() => {
    if (!formData.curso || cursos.length === 0) return;

    const cursoSelecionado = cursos.find(c => c.value === Number(formData.curso));
    if (cursoSelecionado) {
      const semestres = Array.from({ length: cursoSelecionado.semestres }, (_, i) => ({
        value: i + 1,
        label: `${i + 1}º Semestre`,
      }));
      setSemestresDisponiveis(semestres);
    } else {
      setSemestresDisponiveis([]);
    }
  }, [formData.curso, cursos]);

  return {
    setSemestresDisponiveis,
    cursos,
    semestresDisponiveis,
    cursosProfessor, 
    setCursosProfessor,
    cursosProfessorAtual, 
    setCursosProfessorAtual,
    editIndex,
    handleEditar,
  };
};