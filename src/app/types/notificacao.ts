import { SolicitacaoDTO } from "./solicitacao";
import { UsuarioSimplesDTO } from "./usuario";

export interface NotificacaoDTO {
    id: number;
    mensagem: string;
    lida: boolean;
    dataCriacao: string;
    tipo: string;
    solicitacao?: SolicitacaoDTO;
    solicitante?: UsuarioSimplesDTO;
    destinatario: UsuarioSimplesDTO;
}