export interface Formacao {
    id: number;
    curso: string;
    instituicao: string;
    titulo: string;
    anoInicio: number;
    anoFim: number;
}

export interface FormacaoDTO {
    curso: string;
    instituicao: string;
    titulo: string;
    anoInicio: number;
    anoFim: number;
}