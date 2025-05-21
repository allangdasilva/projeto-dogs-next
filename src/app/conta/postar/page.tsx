import ContaPostar from "@/components/conta/ContaPostar";
import { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Postar | Minha Conta",
  description: "Poste sua foto no site Dogs.",
};

export default async function PostarPage() {
  return (
    <>
      <ContaPostar />
    </>
  );
}
