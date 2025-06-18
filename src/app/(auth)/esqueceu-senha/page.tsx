"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import InputAuth from "@/components/InputAuth";
import ButtonAuth from "@/components/ButtonAuth";
import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import React from "react";
import { handleFetchError } from "@/utils/handleFetchError";
import Alerta from "@/components/Alerta";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEmail } from "../../utils/validacoesForm";


export default function EsqueceuSenhaPage() {
  const { isLoading, erro, sucesso, mostrarAlerta, setIsLoading, setErro, setSucesso } = useAlertaTemporarioContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(schemaEmail),
  });

  const onSubmit = async (data: { email: string }) => {
    setIsLoading(true);

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/esqueceu-senha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorData = await res.text();
            throw new Error(errorData || "Erro ao redifinir senha");
        }

        localStorage.setItem("mensagemSucesso", "E-mail enviado com instruções para redefinir a senha.");
        window.location.href = "/login";
        setErro("");
    } catch (error: any) {
      setErro(handleFetchError(error));
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
        {mostrarAlerta && (
            <Alerta text={erro || sucesso} theme={erro ? "erro" : "sucesso"} top="10rem" />
        )}
        <section>
            <div className={styles.esqueceu_senha}>
                <h1>ESQUECI MINHA SENHA</h1>
                <p>Para redefinir sua senha, informe o e-mail cadastrado na sua conta e lhe enviaremos um link com as instruções.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
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

                    <ButtonAuth
                        text={"Enviar"}
                        type="submit"
                        theme="primary"
                        loading={isLoading}
                        margin="0"
                    />
                </form>
            </div>
      </section>
    </div>
  );
}
