import styles from './statusBadge.module.scss';

interface StatusBadgeProps {
  status: 'RESERVADO' | 'EM_ANDAMENTO' | 'DISPONIVEL' | 'INDISPONIVEL' | 'CONCLUIDO' | 'PENDENTE' | 'APROVADA' | 'REJEITADA' | 'CANCELADA' | 'CONCLUIDA';
  style?: React.CSSProperties;
}

const statusMap: Record<string, string> = {
  RESERVADO: 'Reservado',
  EM_ANDAMENTO: 'Em andamento',
  DISPONIVEL: 'Disponível',
  INDISPONIVEL: 'Indisponível',
  CONCLUIDO: 'Concluído',
  PENDENTE: 'Pendente',
  APROVADA: 'Aprovada',
  REJEITADA: 'Rejeitada',
  CANCELADA: 'Cancelada',
  CONCLUIDA: 'Concluída',
};

export default function StatusBadge({ status, style }: StatusBadgeProps) {
    return (
        <span className={`${styles.badge} ${styles[status]}`} style={style}>
        {statusMap[status]}
        </span>
    );
  }
