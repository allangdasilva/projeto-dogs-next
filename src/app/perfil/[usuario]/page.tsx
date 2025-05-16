export default async function UsuarioPage({
  params,
}: {
  params: { usuario: string };
}) {
  return (
    <>
      <main>
        <h1>{params.usuario}</h1>
      </main>
    </>
  );
}
