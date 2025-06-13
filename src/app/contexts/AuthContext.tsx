import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Estudante, Professor, Usuario, UsuarioCompleto } from "@/types";

interface AuthContextType {
  usuario: Estudante | Professor | null;
  setUsuario: (usuario: UsuarioCompleto | null) => void;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  usuario: null,
  setUsuario: () => {},
  loading: false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<UsuarioCompleto | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

useEffect(() => {
  const fetchUsuario = async () => {
    if (usuario) return;

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resumo`, {
        credentials: "include",
      });

      if (!res.ok) {
        const publicPaths = ["/login", "/cadastro", "/esqueceu-senha", "/redefinir-senha"];
        const pathname = window.location.pathname;

        const isPublicPage = publicPaths.some((path) => pathname.startsWith(path));
        if (!isPublicPage) {
          router.push("/login");
        }

        return;
      }

      const data = await res.json();
      setUsuario(data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchUsuario();
}, []);

  const logout = async () => {
    try {
      await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUsuario(null);
      router.push("/login");
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
  };