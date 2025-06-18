"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import InputAuth from "../../components/InputAuth";
import ButtonAuth from "@/components/ButtonAuth";
import Select from "@/components/SelectAuth";
import Alerta from "@/components/Alerta";
import { generos } from "@/types";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCadastro } from "../../utils/validacoesForm";
import { FormularioEstudante } from "@/types";

export default function Cadastro() {
  const [cursos, setCursos] = useState<{ value: number; label: string; semestres: number }[]>([]);
  const [semestresDisponiveis, setSemestresDisponiveis] = useState<{ value: number; label: string }[]>([]);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [mostrarMensagem, setmostrarMensagem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormularioEstudante>({
    resolver: yupResolver(schemaCadastro),
  });

  const cursoSelecionado = watch("curso");

  useEffect(() => {
    async function fetchCursos() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cursos/lista`);
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();

        const cursosFormatados = data.map((curso: any) => ({
          value: curso.id,
          label: curso.nome,
          semestres: curso.semestres,
        }));

        setCursos(cursosFormatados);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    }

    fetchCursos();
  }, []);

  useEffect(() => {
    if (cursoSelecionado) {
      const curso = cursos.find((c) => c.value === Number(cursoSelecionado));
      if (curso) {
        const semestres = Array.from({ length: curso.semestres }, (_, i) => ({
          value: i + 1,
          label: `${i + 1}º Semestre`,
        }));
        setSemestresDisponiveis(semestres);
        setValue("semestre", "");
      }
    }
  }, [cursoSelecionado, cursos, setValue]);

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

  const onSubmit = async (dados: FormularioEstudante) => {
    setIsLoading(true);

    const estudante = {
      nome: dados.nome,
      dataNascimento: dados.dataNascimento,
      genero: dados.genero,
      email: dados.email,
      senha: dados.senha,
      matricula: dados.matricula,
      semestre: Number(dados.semestre),
      idCurso: Number(dados.curso),
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/estudantes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(estudante),
      });

      if (!response.ok) throw new Error(await response.text());

      setSucesso("Estudante cadastrado com sucesso!");
      setErro("");
    } catch (error: any) {
      console.error("Erro ao cadastrar estudante:", error);
      setErro(error.message || "Erro desconhecido.");
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <section>
        {sucesso && mostrarMensagem && <Alerta text={sucesso} theme="sucesso" />}
        {erro && mostrarMensagem && <Alerta text={erro} theme="erro" />}

        <div className={styles.cadastro}>
          <h1>Cadastro de Conta</h1>
          <p>Seja bem-vindo! Crie seu acesso rapidamente.</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="nome"
              control={control}
              render={({ field, fieldState }) => (
                <InputAuth
                  label="Nome Completo"
                  type="text"
                  placeholder="Digite seu nome"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="dataNascimento"
              control={control}
              render={({ field, fieldState }) => (
                <InputAuth
                  label="Data de nascimento"
                  type="date"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="genero"
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  name="genero"
                  text="Gênero"
                  options={generos}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Selecione um gênero"
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="curso"
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  name="curso"
                  text="Curso"
                  options={cursos}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Selecione um curso"
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="semestre"
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  name="semestre"
                  text="Semestre"
                  options={semestresDisponiveis}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Selecione um semestre"
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="matricula"
              control={control}
              render={({ field, fieldState }) => (
                <InputAuth
                  label="Matrícula"
                  type="number"
                  placeholder="Digite sua matrícula"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <InputAuth
                  label="E-mail"
                  type="email"
                  placeholder="Digite seu email"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  autoComplete="email"
                />
              )}
            />

            <Controller
              name="senha"
              control={control}
              render={({ field, fieldState }) => (
                <InputAuth
                  label="Senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  autoComplete="new-password"
                />
              )}
            />

            <ButtonAuth text="Cancelar" type="reset" theme="secondary" loading={isLoading} />
            <ButtonAuth text="Cadastrar" type="submit" theme="primary" disabled={isLoading} />
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
