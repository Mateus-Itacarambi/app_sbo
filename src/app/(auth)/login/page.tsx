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

export default function Login() {
  const { isLoading, erro, sucesso, mostrarAlerta, setIsLoading, setErro, setSucesso } = useAlertaTemporarioContext();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();
  const { usuario, setUsuario } = useAuth();

  useEffect(() => {
    if (usuario) {
      router.push("/");
    }
  }, [usuario]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
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

          <form onSubmit={handleLogin}>
            <InputAuth
              label="E-mail"
              type="email"
              placeholder="Entre com seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputAuth
              label="Senha"
              type="password"
              placeholder="***************"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
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
