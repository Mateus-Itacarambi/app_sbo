"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { handleFetchError } from "@/utils/handleFetchError";
import InputAuth from "@/components/InputAuth";
import ButtonAuth from "@/components/ButtonAuth";
import Alerta from "@/components/Alerta";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";

export default function RedefinirSenhaPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { usuario, loading, logout } = useAuth();
  const router = useRouter();

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const { isLoading, setIsLoading, erro, sucesso, setErro, setSucesso, mostrarAlerta } = useAlertaTemporarioContext();

  useEffect(() => {
    if (loading) return;

    if (!token && !usuario) {
      router.push("/login");
    }
  }, [token, usuario, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    try {
      const url = token
        ? `${process.env.NEXT_PUBLIC_API_URL}/auth/redefinir-senha`
        : `${process.env.NEXT_PUBLIC_API_URL}/auth/alterar-senha`;

      const payload = token
        ? { token, novaSenha }
        : { senhaAtual, novaSenha };

      const method = token ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      if (token) {
        localStorage.setItem("mensagemSucesso", "Senha redefinida com sucesso!");
        window.location.href = "/login";
      } else {
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmarSenha("");
        localStorage.setItem("mensagemSucesso", "Senha alterada com sucesso!");
        logout();
        window.location.href = "/login";
      }
    } catch (error: any) {
      setErro(handleFetchError(error));
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
          <h1>{token ? "Redefinição de Senha" : "Alterar Senha"}</h1>
          <form onSubmit={handleSubmit}>
            {!token && (
              <InputAuth
                label="Senha atual"
                type="password"
                placeholder="Senha atual"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
              />
            )}
            <InputAuth
              label="Nova senha"
              type="password"
              placeholder="Nova senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
            <InputAuth
              label="Confirmar nova senha"
              type="password"
              placeholder="Confirmar nova senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <ButtonAuth
              text={token ? "Redefinir" : "Alterar"}
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
