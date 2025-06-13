"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import InputAuth from "../../components/InputAuth";
import { useState, useEffect } from "react";
import ButtonAuth from "@/components/ButtonAuth";
import SelectAuth from "@/components/SelectAuth";
import Alerta from "@/components/Alerta";
import { generos } from "@/types";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [genero, setGenero] = useState("");
  const [curso, setCurso] = useState("");
  const [semestre, setSemestre] = useState("");
  const [cursos, setCursos] = useState<
    { value: number; label: string; semestres: number }[]
  >([]);
  const [semestresDisponiveis, setSemestresDisponiveis] = useState<
    { value: number; label: string }[]
  >([]);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [mostrarMensagem, setmostrarMensagem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (erro || sucesso) {
      setmostrarMensagem(true);

      const timer = setTimeout(() => {
        setmostrarMensagem(false);
        setErro("");
        setSucesso("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [erro, sucesso]);

  useEffect(() => {
    async function fetchCursos() {
      try {
        const response = await fetch("http://localhost:8080/cursos/lista");

         if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData || "Erro ao buscar cursos");
        }
        
        const data = await response.json();

        setCursos(
          data.map((curso: any) => ({
            value: curso.id,
            label: curso.nome,
            semestres: curso.semestres,
          }))
        );
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    }

    fetchCursos();
  }, []);

  const handleCursoChange = (cursoId: string) => {
    setCurso(cursoId);

    const cursoSelecionado = cursos.find(
      (curso) => curso.value === Number(cursoId)
    );
    if (cursoSelecionado) {
      const semestres = Array.from(
        { length: cursoSelecionado.semestres },
        (_, i) => ({
          value: i + 1,
          label: `${i + 1}º Semestre`,
        })
      );
      setSemestresDisponiveis(semestres);
      setSemestre("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const estudante = {
      nome,
      dataNascimento,
      genero,
      email,
      senha,
      matricula,
      semestre: Number(semestre),
      idCurso: Number(curso),
    };

    try {
      const response = await fetch("http://localhost:8080/estudantes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(estudante),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Erro ao cadastrar estudante");
      }

      setSucesso("Estudante cadastrado com sucesso!");
      setErro("");
    } catch (error: any) {
      console.error("Erro ao cadastrar estudante:", error);

      if (error.message.includes("Failed to fetch")) {
        setErro("Erro ao conectar ao servidor.");
      } else {
        setErro(error.message || "Erro desconhecido.");
      }

      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <section>
        {sucesso && mostrarMensagem && (
          <Alerta text={sucesso} theme="sucesso" />
        )}
        {erro && mostrarMensagem && <Alerta text={erro} theme="erro" />}
        <div className={styles.cadastro}>
          <h1>Cadastro de Conta</h1>
          <p>Seja bem-vindo! Crie seu acesso rapidamente.</p>

          <form name="cadastro_estudante" onSubmit={handleSubmit}>
            <InputAuth
              label="Nome Completo"
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <InputAuth
              label="Data de nascimento"
              type="date"
              placeholder=""
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />

            <SelectAuth
              options={generos}
              onChange={(value) => setGenero(value)}
              text="Gênero"
              placeholder="Selecione um gênero"
              name="genero"
            />

            <SelectAuth
              options={cursos}
              onChange={handleCursoChange}
              text="Curso"
              placeholder="Selecione um curso"
              name="curso"
            />

            <SelectAuth
              options={semestresDisponiveis} 
              onChange={(value) => setSemestre(value)} 
              text="Semestre" 
              placeholder="Selecione um semestre"
              name="semestre"
            />

            <InputAuth
              label="Matrícula"
              type="number"
              placeholder="Digite sua matrícula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />

            <InputAuth
              label="E-mail"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputAuth
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <ButtonAuth
              text="Cancelar"
              type="reset"
              theme="secondary"
              loading={isLoading}
            />
            <ButtonAuth
              text={"Cadastrar"}
              type="submit"
              theme="primary"
              loading={isLoading}
            />
          </form>
          <p>
            Já possui uma conta?{" "}
            <Link href={"/login"}>
              <span>Login</span>
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
