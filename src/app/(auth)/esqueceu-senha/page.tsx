"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import InputAuth from "@/components/InputAuth";
import ButtonAuth from "@/components/ButtonAuth";
import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import React from "react";
import { handleFetchError } from "@/utils/handleFetchError";
import Alerta from "@/components/Alerta";
import { useRouter } from "next/navigation";

export default function EsqueceuSenhaPage() {
  const [email, setEmail] = useState("");
  const { isLoading, erro, sucesso, mostrarAlerta, setIsLoading, setErro, setSucesso } = useAlertaTemporarioContext();
  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/esqueceu-senha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
                <form onSubmit={handleSubmit}>
                    <InputAuth
                        label="E-mail"
                        type="email"
                        placeholder="Seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
