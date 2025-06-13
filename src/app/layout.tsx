import { AlertaProvider } from "./contexts/AlertaContext";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Sistema de Busca de Orientadores",
    default: "Sistema de Busca de Orientadores",
  },
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <AlertaProvider>
          {children}
        </AlertaProvider>
      </body>
    </html>
  );
}
