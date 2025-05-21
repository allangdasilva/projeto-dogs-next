import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estatísticas | Minha Conta",
  description: "Estatísticas do site Dogs.",
};

export default async function EstatisticasPage() {
  return (
    <>
      <main>
        <h1>Estátisticas</h1>
      </main>
    </>
  );
}
