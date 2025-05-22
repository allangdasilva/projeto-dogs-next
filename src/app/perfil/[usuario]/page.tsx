import getFotos from "@/actions/get-fotos";
import Feed from "@/components/feed/Feed";

interface UsuarioParams {
  params: Promise<{
    usuario: string;
  }>;
}
export default async function UsuarioPage({ params }: UsuarioParams) {
  const { data } = await getFotos({ user: (await params).usuario });

  if (!data) return null;
  return (
    <>
      <section className="container mainSection">
        <h1 className="title">{(await params).usuario}</h1>
        <Feed fotos={data} user={(await params).usuario} />
      </section>
    </>
  );
}
