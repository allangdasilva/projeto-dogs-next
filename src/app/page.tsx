import getFotos from "@/actions/get-fotos";
import Feed from "@/components/feed/Feed";

export default async function Home() {
  const { data } = await getFotos();

  return (
    <>
      <section className="container mainContainer">
        {data && <Feed fotos={data} />}
      </section>
    </>
  );
}
