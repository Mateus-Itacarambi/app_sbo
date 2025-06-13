import { useState } from 'react';

export const useFormulario = (initialState: any) => {
  const [formData, setFormData] = useState(initialState);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGeneroChange = (genero: string) => {
    setFormData({ ...formData, genero: genero });
  };

  const handleSemestreChange = (semestre: string) => {
    setFormData({ ...formData, semestre: Number(semestre) });
  };

  const handleCursoChange = (cursoId: string) => {
    setFormData({ ...formData, curso: Number(cursoId), semestre: "" });
  };
  
  return {
    formData,
    setFormData,
    handleChange,
    handleGeneroChange,
    handleSemestreChange,
    handleCursoChange,
  };
};