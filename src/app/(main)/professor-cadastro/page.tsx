"use client";

import { useState, useEffect } from 'react';
import styles from './professor-cadastro.module.scss';
import ButtonAuth from '@/components/ButtonAuth';
import Alerta from '@/components/Alerta';
import { useAlertaTemporarioContext } from '@/contexts/AlertaContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from "next/navigation";

export default function UploadProfessores() {
  const [formData, setFormData] = useState<any>({});
  const { usuario } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const { erro, sucesso, isLoading, mostrarAlerta, setErro, setSucesso, setIsLoading } = useAlertaTemporarioContext();

  useEffect(() => {
    if (usuario) {
      if (usuario.role !== "ADMINISTRADOR") {
        router.push("/");
      }
      setFormData({ ...usuario });
    }
  }, [usuario]);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };
  
  const handleFileUpload = async () => {
    if (!file) return;
    setIsLoading(true);
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch('http://localhost:8080/professores/importar-relatorio-csv', {
        method: 'POST',
        body: formData,
        credentials: "include",
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "relatorio_importacao_professores.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setSucesso("Arquivo processado com sucesso!");
        setErro("");
      } else {
        const errorData = await response.text();
        throw new Error(errorData || "Erro ao processar arquivo!");
      }
    } catch (error: any) {
      console.error("Erro ao processar arquivo:", error);
      setErro(error.message || "Erro desconhecido.");
      setSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      {mostrarAlerta && (
        <Alerta text={erro || sucesso} theme={erro ? "erro" : "sucesso"} top="10rem" />
      )}
      <div className={styles.container}>
        <div className={styles.card_container}>
          <h2>Importar Professores</h2>
          <p>Arquivo</p>
          <input type="file" accept=".csv" onChange={handleSelectFile} />
          <p>Apenas arquivos .csv serão aceitos</p>
          <h3>Exemplo de arquivo .csv</h3>
          <div className={styles.exemplo}>
            <p>NOME</p>
            <p>EMAIL</p>
            <p>Luiz Márcio Severino Dias</p>
            <p>luiz.dias@ifb.edu.br</p>
          </div>
          <div className={styles.obs}><strong>Observação: </strong>os valores contidos no arquivo .csv devem estar separados por vírgula.</div>
          <ButtonAuth text={"Processar Arquivo"} type="button" onClick={handleFileUpload} disabled={isLoading || !file} loading={isLoading} theme="primary" margin="2rem 0 0 0"/>
        </div>
      </div>
    </div>
  );
}
