import CursoPerfil from "@/components/Curso/CursoPerfil";
// import CursoNaoEncontrado from "@/components/Curso/CursoNaoEncontrado";

export default async function CursoPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cursos/${params.slug}`, {
    credentials: "include",
    cache: "no-store",
  });

//   if (!res.ok) return <CursoNaoEncontrado />;

  const curso = await res.json();
  return <CursoPerfil curso={curso} />;
}
