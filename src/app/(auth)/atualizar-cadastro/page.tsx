"use client";

import styles from "./atualizar-cadastro.module.scss";
import InputAuth from "../../components/InputAuth";
import { useState, useEffect } from "react";
import ButtonAuth from "@/components/ButtonAuth";
import SelectAuth from "@/components/SelectAuth";
import Alerta from "@/components/Alerta";
import { generos } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useAlertaTemporario } from '@/hooks/useAlertaTemporario';

export default function AtualizarCadastro() {
  const [formData, setFormData] = useState<any>({});
  const { usuario, setUsuario } = useAuth();
  const router = useRouter();
  const [dataNascimento, setDataNascimento] = useState("");
  const [idLattes, setIdLattes] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [senhaConfirmar, setSenhaConfirmar] = useState("");
  const [genero, setGenero] = useState("");

  const {
    erro,
    setErro,
    sucesso,
    setSucesso,
    mostrarAlerta,
    isLoading,
    setIsLoading
  } = useAlertaTemporario();

  useEffect(() => {
    if (usuario) {
      if (usuario.role !== "PROFESSOR" || usuario.cadastroCompleto === true) {
        router.push("/");
      }
      setFormData({ ...usuario });
    }
  }, [usuario]);

  const handleAtualizarCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const professor = {
      id: formData.id,
      nome: formData.nome,
      dataNascimento,
      genero,
      email: formData.email,
      senhaAtual,
      senhaNova,
      senhaConfirmar,
      idLattes,
    };

    try {
      const response = await fetch(`http://localhost:8080/professores/atualizar-cadastro`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(professor),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Erro ao atualizar cadastro!");
      }

      localStorage.setItem("mensagemSucesso", "Atualizado com sucesso!");
      location.reload();
    } catch (error: any) {
      console.error("Erro ao atualizar cadastro:", error);
      setErro(error.message || "Erro desconhecido.");
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGeneroChange = (value: string) => {
    setFormData({ ...formData, genero: value });
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

          <form name="atualizar-cadastro" onSubmit={handleAtualizarCadastro}>
            <InputAuth
              label="Nome Completo"
              name="nome"
              type="text"
              placeholder="Digite seu nome"
              value={formData.nome}
              onChange={handleChange}
            />

            <InputAuth
              label="Data de nascimento"
              name="dataNascimento"
              type="date"
              placeholder=""
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />

            <SelectAuth
              name="genero"
              options={generos}
              onChange={(value) => setGenero(value)}
              text="Gênero"
              placeholder="Selecione um gênero"
            />

            <InputAuth
              label="ID Lattes"
              type="text"
              placeholder="Digite seu ID Lattes"
              value={idLattes}
              onChange={(e) => setIdLattes(e.target.value)}
            />

            <InputAuth
              label="Email"
              name="email"
              type="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChange}
            />

            <InputAuth
              label="Senha Atual"
              name="senhaAntiga"
              type="password"
              placeholder="Digite sua senha"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
            />

            <InputAuth
              label="Nova Senha"
              name="senhaNova"
              type="password"
              placeholder="Digite sua nova senha"
              value={senhaNova}
              onChange={(e) => setSenhaNova(e.target.value)}
            />

            <InputAuth
              label="Confirmar Senha"
              name="senhaConfirmar"
              type="password"
              placeholder="Confirme sua nova senha"
              value={senhaConfirmar}
              onChange={(e) => setSenhaConfirmar(e.target.value)}
            />

            <ButtonAuth
              text="Cancelar"
              type="reset"
              theme="secondary"
              loading={isLoading}
            />
            <ButtonAuth
              text={"Atualizar"}
              type="submit"
              theme="primary"
              loading={isLoading}
            />
          </form>
        </div>
      </section>
    </div>
  );
}
