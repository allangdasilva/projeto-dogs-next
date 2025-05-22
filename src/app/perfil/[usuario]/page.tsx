import getFotos from "@/actions/get-fotos";
import Feed from "@/components/feed/Feed";

export default async function UsuarioPage({
  params,
}: {
  params: { usuario: string };
}) {
  const parametro = await params;
  const { data } = await getFotos({ user: parametro.usuario });
  if (!data) return null;
  return (
    <>
      <section className="container mainSection">
        <h1 className="title">{parametro.usuario}</h1>
        <Feed fotos={data} user={parametro.usuario} />
      </section>
    </>
  );
}
