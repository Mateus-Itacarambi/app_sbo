"use client";

import styles from "./atualizar-cadastro.module.scss";
import InputAuth from "../../components/InputAuth";
import ButtonAuth from "@/components/ButtonAuth";
import SelectAuth from "@/components/SelectAuth";
import Alerta from "@/components/Alerta";
import { generos } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useAlertaTemporario } from "@/hooks/useAlertaTemporario";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { schemaAtualizarCadastro } from "@/utils/validacoesForm";

type FormData = {
  nome: string;
  dataNascimento: string;
  genero: string;
  idLattes: string;
  email: string;
  senhaAtual: string;
  senhaNova: string;
  senhaConfirmar: string;
};

export default function AtualizarCadastro() {
  const { usuario } = useAuth();
  const router = useRouter();

  const {
    erro,
    setErro,
    sucesso,
    setSucesso,
    mostrarAlerta,
    isLoading,
    setIsLoading
  } = useAlertaTemporario();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemaAtualizarCadastro),
  });

  useEffect(() => {
    if (!usuario) return;

    if (usuario?.role !== "PROFESSOR" || usuario?.cadastroCompleto) {
      router.push("/");
      return;
    }

    reset({
      nome: usuario.nome || "",
      dataNascimento: "",
      genero: "",
      idLattes: "",
      email: usuario.email || "",
      senhaAtual: "",
      senhaNova: "",
      senhaConfirmar: "",
    });
  }, [usuario, reset]);

  const onSubmit = async (data: FormData) => {
    setErro("");
    setSucesso("");
    setIsLoading(true);

    try {
      const payload = { id: usuario?.id, ...data };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/professores/atualizar-cadastro`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(await response.text());

      localStorage.setItem("mensagemSucesso", "Atualizado com sucesso!");
      location.reload();
    } catch (error: any) {
      setErro(error.message || "Erro ao atualizar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <section>
        {mostrarAlerta && (
          <Alerta text={erro || sucesso} theme={erro ? "erro" : "sucesso"} top="10rem" />
        )}
        <div className={styles.cadastro}>
          <h1>Atualizar Cadastro</h1>
          <p>Seja bem-vindo! Atualize seu acesso rapidamente.</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="nome"
              control={control}
              render={({ field }) => (
                <InputAuth label="Nome Completo" type="text" {...field} error={errors.nome?.message} />
              )}
            />

            <Controller
              name="dataNascimento"
              control={control}
              render={({ field }) => (
                <InputAuth label="Data de nascimento" type="date" {...field} error={errors.dataNascimento?.message} />
              )}
            />

            <Controller
              name="genero"
              control={control}
              render={({ field }) => (
                <SelectAuth
                  name="genero"
                  text="Gênero"
                  options={generos}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Selecione um gênero"
                  error={errors.genero?.message}
                />
              )}
            />

            <Controller
              name="idLattes"
              control={control}
              render={({ field }) => (
                <InputAuth label="ID Lattes" type="number" {...field} error={errors.idLattes?.message} />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputAuth label="Email" type="email" {...field} error={errors.email?.message} autoComplete="email" />
              )}
            />

            <Controller
              name="senhaAtual"
              control={control}
              render={({ field }) => (
                <InputAuth label="Senha Atual" type="password" {...field} error={errors.senhaAtual?.message} autoComplete="new-password" />
              )}
            />

            <Controller
              name="senhaNova"
              control={control}
              render={({ field }) => (
                <InputAuth label="Nova Senha" type="password" {...field} error={errors.senhaNova?.message} />
              )}
            />

            <Controller
              name="senhaConfirmar"
              control={control}
              render={({ field }) => (
                <InputAuth label="Confirmar Senha" type="password" {...field} error={errors.senhaConfirmar?.message} />
              )}
            />

            <ButtonAuth text="Cancelar" type="reset" theme="secondary" disabled={isLoading} />
            <ButtonAuth text="Atualizar" type="submit" theme="primary" loading={isLoading} />
          </form>
        </div>
      </section>
    </div>
  );
}
