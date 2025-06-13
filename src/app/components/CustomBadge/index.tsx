import { AreaInteresse, CursoProfessor } from '@/types';
import styles from './customBadge.module.scss';
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

interface CustomBadgeProps {
  areaInteresse?: AreaInteresse;
  curso?: CursoProfessor;
  palavraChave?: string;
  style: string;
  mostrarBotao: boolean;
  onRemover?: (id: number) => void;
  onRemoverPalavraChave?: () => void;
}

export default function StatusBadge({ areaInteresse, curso, palavraChave, style, mostrarBotao, onRemover, onRemoverPalavraChave }: CustomBadgeProps) {
    return (
      <>
        {areaInteresse ? (
          <span className={`${styles[style]}`}>
            {areaInteresse.nome}
            {mostrarBotao && <button onClick={() => onRemover && onRemover(areaInteresse.id)}>x</button>}
          </span>
        ) : curso ? (
          <span className={`${styles[style]}`}>
            <Link href={`/curso/${curso.slug}`} target="_blank">
              {curso.nome}
              <SquareArrowOutUpRight size={16}/>
            </Link>
            {mostrarBotao && <button onClick={() => onRemover && onRemover(curso.id)}>x</button>}
          </span>
        ) : palavraChave ? (
          <span className={`${styles[style]}`}>
            {palavraChave}
            {mostrarBotao && <button onClick={onRemoverPalavraChave}>x</button>}
          </span>
        ) : null}
      </>
    );
  }
