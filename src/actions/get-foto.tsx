"use server";

import { FOTO_GET } from "@/functions/api";
import apiError from "@/functions/apiError";
import { Foto } from "./get-fotos";

export type Comentario = {
  comment_ID: string;
  comment_post_ID: string;
  comment_author: string;
  comment_content: string;
};
export type FotoData = {
  photo: Foto;
  comments: Comentario[];
};
export default async function getFoto(id: string) {
  try {
    const { url } = FOTO_GET(id);
    const response = await fetch(url, {
      method: "GET",
      next: {
        revalidate: 60,
        tags: ["fotos", "comentarios"],
      },
    });
    if (!response.ok) throw new Error("Erro ao pegar a foto.");
    const data = (await response.json()) as FotoData;
    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
