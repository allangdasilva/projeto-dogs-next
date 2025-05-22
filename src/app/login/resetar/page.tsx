import FormResetar from "@/components/login/FormResetar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resetar senha | Dogs",
  description: "Resete a sua senha.",
};

interface ResetarSearchParams {
  searchParams: Promise<{
    key: string;
    login: string;
  }>;
}

export default async function ResetarPage({
  searchParams,
}: ResetarSearchParams) {
  return (
    <>
      <div className="animeLeft">
        <h1 className="title">Resetar a senha</h1>
        <FormResetar
          keyToken={(await searchParams).key}
          login={(await searchParams).login}
        />
      </div>
    </>
  );
}
