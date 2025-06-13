import Perfil from "@/components/Perfil/Perfil";
import PerfilNaoEncontrado from "@/components/Perfil/PerfilNaoEncontrado";

export default async function PerfilPage({ params }: { params: { identificador: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/${params.identificador}`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    return <PerfilNaoEncontrado/>;
  }

  const usuario = await res.json();

  return <Perfil usuarioVisualizado={usuario} />;
}
