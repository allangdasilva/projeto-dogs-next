"use server";
export type Foto = {
  id: number;
  author: string;
  title: string;
  date: string;
  src: string;
  peso: string;
  idade: string;
  acessos: number;
};
export default async function getFotos() {
  const response = await fetch(
    "https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=6&_user=0"
  );
  return (await response.json()) as Foto[];
}
