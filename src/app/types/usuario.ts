export interface Usuario {
    id: number;
    nome: string;
    email: string;
    dataNascimento: string;
    genero: string;
    role?: string;
    ativo?: boolean;
    cadastroCompleto?: boolean;
    profileImage?: string;
  }

export interface UsuarioSimplesDTO {
    id: number;
    nome: string;
    role: string;
    slug: string;
}

export interface UsuarioDTO {
    id: number;
    nome: string;
  }