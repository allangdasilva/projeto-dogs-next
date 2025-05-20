import FormResetar from "@/components/login/FormResetar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resetar senha | Dogs",
  description: "Resete a sua senha.",
};

type ResetarSearchParams = {
  searchParams: {
    key: string;
    login: string;
  };
};

export default async function ResetarPage({
  searchParams,
}: ResetarSearchParams) {
  const searchP = await searchParams;
  return (
    <>
      <div className="animeLeft">
        <h1 className="title">Resetar a senha</h1>
        <FormResetar keyToken={searchP.key} login={searchP.login} />
      </div>
    </>
  );
}
