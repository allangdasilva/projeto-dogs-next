import getEstatisticas from "@/actions/get-estatisticas";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ContaEstatisticas = dynamic(
  () => import("@/components/conta/ContaEstatisticas"),
  {
    loading: () => <p>Carregando...</p>,
  }
);

export const metadata: Metadata = {
  title: "Estatísticas | Minha Conta",
  description: "Estatísticas do site Dogs.",
};

export default async function EstatisticasPage() {
  const { data } = await getEstatisticas();
  if (!data) return null;
  return (
    <>
      <section>
        <ContaEstatisticas data={data} />
      </section>
    </>
  );
}
