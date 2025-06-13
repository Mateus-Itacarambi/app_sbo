"use client";

import "../globals.css";
import NavBar from "../components/NavBar";
import { AuthProvider } from "@/contexts/AuthContext";
import Loading from "@/components/Loading/loading";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <main>
          <Loading />
          {children}
        </main>
      </AuthProvider>
    </>
  );
}