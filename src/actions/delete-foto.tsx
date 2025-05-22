"use server";

import { FOTO_DELETE, FOTO_POST } from "@/functions/api";
import apiError from "@/functions/apiError";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function fotoDelete(id: string) {
  const token = (await cookies()).get("token")?.value;
  try {
    if (!token) throw new Error("Token inválido.");

    const { url } = FOTO_DELETE(id);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) throw new Error("Erro ao deletar a foto.");
  } catch (error: unknown) {
    return apiError(error);
  }
  revalidateTag("fotos");
  redirect("/conta");
}
