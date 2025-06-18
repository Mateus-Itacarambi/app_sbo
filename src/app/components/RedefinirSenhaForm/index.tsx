"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAlertaTemporarioContext } from "@/contexts/AlertaContext";
import { handleFetchError } from "@/utils/handleFetchError";
import InputAuth from "@/components/InputAuth";
import ButtonAuth from "@/components/ButtonAuth";
import Alerta from "@/components/Alerta";
import styles from "./redefinirSenhaForm.module.scss";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRedefinirSenha } from "../../utils/validacoesForm";

export default function RedefinirSenhaForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { usuario, loading, logout } = useAuth();
  const router = useRouter();
  const { isLoading, setIsLoading, erro, sucesso, setErro, setSucesso, mostrarAlerta } = useAlertaTemporarioContext();

  const {
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schemaRedefinirSenha),
    context: { token: !!token },
    defaultValues: {
      senhaAtual: "",
      novaSenha: "",
      confirmarSenha: "",
    },
  });

  useEffect(() => {
    if (loading) return;
    if (!token && !usuario) router.push("/login");
  }, [token, usuario, loading]);

  const onSubmit = async (data: any) => {
    setErro("");
    setSucesso("");
    setIsLoading(true);

    try {
      const url = token
        ? `${process.env.NEXT_PUBLIC_API_URL}/auth/redefinir-senha`
        : `${process.env.NEXT_PUBLIC_API_URL}/auth/alterar-senha`;

      const payload = token
        ? { token, novaSenha: data.novaSenha }
        : { senhaAtual: data.senhaAtual, novaSenha: data.novaSenha };

      const method = token ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

      localStorage.setItem("mensagemSucesso", "Senha alterada com sucesso!");
      logout();
      router.push("/login");

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
          <h1>{token ? "Redefinir Senha" : "Alterar Senha"}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!token && (
              <Controller
                name="senhaAtual"
                control={control}
                render={({ field, fieldState }) => (
                  <InputAuth
                    label="Senha atual"
                    type="password"
                    placeholder="Senha atual"
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                    autoComplete="new-password"
                  />
                )}
              />
            )}
            <Controller
              name="novaSenha"
              control={control}
              render={({ field, fieldState }) => (
                <InputAuth
                  label="Nova senha"
                  type="password"
                  placeholder="Nova senha"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  autoComplete="new-password"
                />
              )}
            />
            <Controller
              name="confirmarSenha"
              control={control}
              render={({ field, fieldState }) => (
                <InputAuth
                  label="Confirmar nova senha"
                  type="password"
                  placeholder="Confirmar nova senha"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  autoComplete="new-password"
                />
              )}
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
