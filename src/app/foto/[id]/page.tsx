import getFoto from "@/actions/get-foto";
import FotoContent from "@/components/foto/FotoContent";
import { notFound } from "next/navigation";

interface FotoIdParams {
  params: Promise<{
    id: string;
  }>;
}
export async function generateMetadata({ params }: FotoIdParams) {
  const { data } = await getFoto((await params).id);
  if (!data) return { title: "Foto" };
  return {
    title: data.photo.title,
  };
}
export default async function FotoIdPage({ params }: FotoIdParams) {
  const { data } = await getFoto((await params).id);
  if (!data) return notFound();
  return (
    <>
      <section className="container mainContainer">
        <FotoContent data={data} single={true} />
      </section>
    </>
  );
}
