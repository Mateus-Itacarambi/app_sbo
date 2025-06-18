"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import InputAuth from "../../components/InputAuth";
import { useState, useEffect } from "react";
import ButtonAuth from "@/components/ButtonAuth";
import Alerta from "@/components/Alerta";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "../../utils/validacoesForm";
import { FormularioEstudante } from "@/types";

export default function Login() {
  const { isLoading, erro, sucesso, mostrarAlerta, setIsLoading, setErro, setSucesso } = useAlertaTemporarioContext();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();
  const { usuario } = useAuth();

  interface FormularioLogin {
    email: string;
    senha: string;
  }

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormularioLogin>({
    resolver: yupResolver(schemaLogin),
  });

  useEffect(() => {
    if (usuario) {
      router.push("/");
    }
  }, [usuario]);

  const handleLogin = async (dados: FormularioLogin) => {
    setIsLoading(true);
    
    const login = {
      email: dados.email,
      senha: dados.senha,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      if (response.ok) {
        router.push("/");

      } else {
        const error = await response.text();
        setErro(error);
        console.error("Erro ao fazer login:", error);
      }
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      setErro("Erro ao conectar ao servidor.");
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
        <div className={styles.login}>
          <h1>BEM-VINDO DE VOLTA</h1>
          <p>Bem-vindo de volta! Por favor, entre com suas credenciais.</p>

          <form onSubmit={handleSubmit(handleLogin)}>
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
                />
              )}
            />

            <Link href="/esqueceu-senha">
              <p>Esqueceu sua senha?</p>
            </Link>

            <ButtonAuth
              text={"Acessar"}
              type="submit"
              theme="primary"
              loading={isLoading}
            />

            <p>
              Não tem uma conta?{" "}
              <Link href="/estudante-cadastro">
                <span>Cadastra-se</span>
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
