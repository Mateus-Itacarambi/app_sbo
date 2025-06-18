import * as yup from "yup";

export const schemaCadastro = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  dataNascimento: yup.string().required("Data de nascimento é obrigatória"),
  genero: yup.string().required("Gênero é obrigatório"),
  curso: yup.string().required("Curso é obrigatório"),
  semestre: yup.string().required("Semestre é obrigatório"),
  matricula: yup
    .string()
    .required("Matrícula é obrigatória")
    .matches(/^\d+$/, "Matrícula deve conter apenas números"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  senha: yup.string().required("Senha é obrigatória"),
});

export const schemaEditarPerfil = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  dataNascimento: yup.string().required("Data de nascimento é obrigatória"),
  genero: yup.string().required("Gênero é obrigatório"),
  matricula: yup.string().when('$estudante', {
    is: true,
    then: (schema) => schema.required("Matrícula é obrigatória"),
  }),
  curso: yup.string().when('$estudante', {
    is: true,
    then: (schema) => schema.required("Curso é obrigatório"),
  }),
  semestre: yup.string().when('$estudante', {
    is: true,
    then: (schema) => schema.required("Semestre é obrigatório"),
  }),
  idLattes: yup.string().when('$professor', {
    is: true,
    then: (schema) => schema.required("ID Lattes é obrigatório"),
  }),
});

export const schemaTema = yup.object({
  titulo: yup.string().required("Título é obrigatório"),
  descricao: yup.string().required("Descrição é obrigatório"),
  palavrasChave: yup.string().required("Palavras-Chave é obrigatória"),
});

export const schemaFormacao = yup.object({
  curso: yup.string().required("Curso é obrigatório"),
  instituicao: yup.string().required("Instituição é obrigatória"),
  titulo: yup.string().required("Título do TCC é obrigatório"),
  anoInicio: yup
    .number()
    .typeError("Ano de Início deve ser um número")
    .required("Ano de Início é obrigatório")
    .integer("Ano de Início deve ser um número inteiro")
    .min(1900, "Ano de Início inválido")
    .max(2200, "Ano de Início inválido")
    .max(new Date().getFullYear(), "Ano de Início não pode ser no futuro"),
  anoFim: yup
    .number()
    .typeError("Ano de Conclusão deve ser um número")
    .required("Ano de Conclusão é obrigatório")
    .integer("Ano de Conclusão deve ser um número inteiro")
    .min(1900, "Ano de Conclusão inválido")
    .max(2200, "Ano de Conclusão inválido")
    .test("anoFim-maior", "Ano de Conclusão deve ser maior que o Ano de Início", function (value) {
      const { anoInicio } = this.parent;
      if (!anoInicio || !value) return true;
      return value > anoInicio;
    }),
});

export const schemaEstudante = yup.object({
  matricula: yup.string().required("Matrícula é obrigatória"),
});
