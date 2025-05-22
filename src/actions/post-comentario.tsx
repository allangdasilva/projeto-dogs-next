"use server";

import { COMENTARIO_POST } from "@/functions/api";
import apiError from "@/functions/apiError";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Comentario } from "./get-foto";

export default async function comentarioPost(state: {}, formData: FormData) {
  const token = (await cookies()).get("token")?.value;
  const comment = formData.get("comment") as string | null;
  const id = formData.get("id") as string | null;

  try {
    if (!token || !comment || !id) throw new Error("Preencha os dados.");

    const { url } = COMENTARIO_POST(id);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    if (!response.ok) throw new Error("Erro ao postar, tente novamente.");
    const data = (await response.json()) as Comentario;
    revalidateTag("comentario");
    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
