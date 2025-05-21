import getFotos from "@/actions/get-fotos";
import getUsuario from "@/actions/get-usuario";
import Feed from "@/components/feed/Feed";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Minha Conta",
  description: "Minha Conta Dogs.",
};

export default async function ContaPage() {
  const { data: user } = await getUsuario();
  const { data } = await getFotos({ user: user?.username });
  return (
    <>
      <main>
        {data?.length ? (
          <Feed fotos={data} />
        ) : (
          <div>
            <p
              style={{
                color: "#444",
                fontSize: "1.25rem",
                marginBottom: "1rem",
              }}
            >
              Nenhuma foto encontrada.
            </p>
            <Link
              href={"/conta/postar"}
              className="button"
              style={{ display: "inline-block" }}
            >
              Postar Foto
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
