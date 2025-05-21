"use server";

import { FOTOS_GET } from "@/functions/api";
import apiError from "@/functions/apiError";

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
type FotoParams = {
  page?: number;
  total?: number;
  user?: 0 | string;
};
export default async function getFotos({
  page = 1,
  total = 6,
  user = 0,
}: FotoParams = {}) {
  try {
    const { url } = FOTOS_GET({ page, total, user });
    const response = await fetch(url, {
      next: {
        revalidate: 10,
        tags: ["fotos"],
      },
    });
    if (!response.ok) throw new Error("Erro ao pegar as fotos.");
    const data = (await response.json()) as Foto[];
    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
