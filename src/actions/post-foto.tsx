"use server";

import { FOTO_POST } from "@/functions/api";
import apiError from "@/functions/apiError";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function fotoPost(
  state: { data?: null; ok?: boolean; error?: string },
  formData: FormData
) {
  const token = (await cookies()).get("token")?.value;
  const nome = formData.get("nome") as string | null;
  const peso = formData.get("peso") as string | null;
  const idade = formData.get("idade") as string | null;
  const img = formData.get("img") as File;
  try {
    if (!token || !nome || !peso || !idade || img.size === 0)
      throw new Error("Preencha os dados.");

    const { url } = FOTO_POST();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    if (!response.ok) throw new Error("Erro ao postar, tente novamente.");
  } catch (error: unknown) {
    return apiError(error);
  }
  revalidateTag("fotos");
  redirect("/conta");
}
