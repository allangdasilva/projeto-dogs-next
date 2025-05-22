"use server";

import { PERDEU_POST } from "@/functions/api";
import apiError from "@/functions/apiError";

export default async function perdeuPost(
  state: { data?: null; ok?: boolean; error?: string },
  formData: FormData
) {
  const login = formData.get("login") as string | null;
  const urlPerdeu = formData.get("url") as string | null;

  try {
    if (!login) throw new Error("Preencha os dados.");
    const { url } = PERDEU_POST();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, url: urlPerdeu }),
    });
    if (!response.ok) throw new Error("Email ou usuário não cadastrado.");
    return { data: null, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
