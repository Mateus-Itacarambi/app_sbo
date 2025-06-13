"use client";

import Link from "next/link";
import Logo from "../Logo";
import styles from "./navbar.module.scss";
import Image from "next/image";
import { usePathname } from "next/navigation";
import iconBell from "@/assets/bell.png";
import Dropdown from "@/components/Dropdown";
import { getInitials } from "@/utils/getInitials";
import { useAuth } from "@/contexts/AuthContext";
import { Professor, Estudante } from "@/types";
import { useEffect, useState } from "react";
import Notificacao from "@/components/Notificacao";
import { NotificacaoDTO } from "@/types/notificacao";
import { useWebSocketNotificacoes } from "@/hooks/useWebSocketNotificacoes";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={isActive ? styles.ativo : ""}
    >
      {children}
    </Link>
  );
};

const NavBar = () => {
  const { usuario, logout, loading } = useAuth();
  const [mostrarNotificacao, setMostrarNotificacao] = useState(false);
  
  const professor = usuario?.role === "PROFESSOR" ? (usuario as Professor) : null;
  const estudante = usuario?.role === "ESTUDANTE" ? (usuario as Estudante) : null;
  const endpoint = estudante ? `/perfil/${estudante.matricula}` : professor ? `/perfil/${professor?.idLattes}` : "/perfil";
  const [notificacoes, setNotificacoes] = useState<NotificacaoDTO[]>([]);

  useEffect(() => {
  const fetchNotificacoes = async () => {
    if (!usuario?.id) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notificacoes/nao-lidas`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Erro ao buscar notificações");
      const data = await res.json();
      setNotificacoes(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchNotificacoes();
}, [usuario, loading]);

  useWebSocketNotificacoes({
    userId: usuario?.id || 0,
    onNovaNotificacao: (nova) => {
      setNotificacoes((prev) => {
        const existe = prev.some(n => n.id === nova.id);
        return existe ? prev : [nova, ...prev];
      });
    },
    onRemoverNotificacao: (id) => {
      setNotificacoes((prev) => prev.filter(n => n.id !== id));
    }
  });

  const marcarComoLida = async (idNotificacao: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notificacoes/${idNotificacao}/marcar-lida`, {
        method: "PUT",
        credentials: "include",
      });

      setNotificacoes((prev) =>
        prev.map((n) =>
          n.id === idNotificacao ? { ...n, lida: true } : n
        )
      );

    } catch (error) {
      console.error("Erro ao marcar como lida:", error);
    }
  };

  const marcarTodasComoLidas = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notificacoes/marcar-todas-lidas`, {
        method: "PUT",
        credentials: "include",
      });

      setNotificacoes((prev) =>
        prev.map((n) => ({ ...n, lida: true }))
      );
    } catch (error) {
      console.error("Erro ao marcar todas como lidas:", error);
    }
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.nav__container}>
          <Logo />
          <ul className={styles.nav__ul}>
            <li tabIndex={0} className={styles.nav__li}>
              <NavLink href="/">Início</NavLink>
            </li>
            <li className={styles.nav__li}>
              <NavLink href="/professores">Professores</NavLink>
            </li>
            <li className={styles.nav__li}>
              <NavLink href="/temas">Temas</NavLink>
            </li>
            <li className={styles.nav__li}>
              <NavLink href="/solicitacoes">Solicitações</NavLink>
            </li>
          </ul>
          <div className={styles.actions}>
          {loading ? null : usuario ? (
              <div className={styles.userSection}>
                <button className={styles.notificacao} onClick={() => setMostrarNotificacao(true)}>
                  <Image src={iconBell} width={23} alt="Ícone de sino" />
                  {notificacoes.some(n => !n.lida) && (
                    <span className={styles.sinal}></span>
                  )}
                </button>

                <Link href={`${endpoint}`}>
                  <div className={styles.profile}>
                    {usuario.profileImage ? (
                      <Image
                        src={usuario.profileImage}
                        width={45}
                        height={45}
                        alt="Foto de perfil"
                        className={styles.profileImage}
                      />
                    ) : (
                      <div className={styles.initials}>
                        {getInitials(usuario.nome)}
                      </div>
                    )}
                  </div>
                </Link>
                
                {estudante ? (
                  <Dropdown
                    width="135px"
                    label=""
                    items={[
                      { type: "link", label: "Perfil", href: `${endpoint}` },
                      { type: "link", label: "Redefinir Senha", href: "/redefinir-senha" },
                      { type: "action", label: "Sair", onClick: logout },
                    ]}
                  />
                ) : professor ? (
                  <Dropdown
                    width="135px"
                    label=""
                    items={[
                      { type: "link", label: "Perfil", href: `${endpoint}` },
                      { type: "link", label: "Redefinir Senha", href: "/redefinir-senha" },
                      { type: "action", label: "Sair", onClick: logout },
                    ]}
                  />
                ) : usuario.role === "ADMINISTRADOR" ? (
                  <Dropdown
                    width="220px"
                    label=""
                    items={[
                      { type: "link", label: "Perfil", href: `${endpoint}` },
                      { type: "link", label: "Redefinir Senha", href: "/redefinir-senha" },
                      { type: "link", label: "Importar Cursos", href: "/cursos-cadastro" },
                      { type: "link", label: "Importar Professores", href: "/professor-cadastro" },
                      { type: "link", label: "Importar Áreas de Interesse", href: "/area-interesse-cadastro" },
                      { type: "action", label: "Sair", onClick: logout },
                    ]}
                  />
                ) : null}
              </div>
            ) : (
              <Link href={"/login"}>
                <button className={styles.nav__button}>Login</button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <Notificacao 
        notificacoes={notificacoes || []}
        marcarTodasComoLidas={marcarTodasComoLidas}
        marcarComoLida={marcarComoLida}
        visivel={mostrarNotificacao} 
        onClose={() => setMostrarNotificacao(false)}
      />
    </>
  );
};

export default NavBar;
