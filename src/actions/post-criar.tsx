"use server";

import { CRIAR_POST } from "@/functions/api";
import apiError from "@/functions/apiError";
import login from "./login";

export default async function criarPost(
  state: { data?: null; ok?: boolean; error?: string },
  formData: FormData
) {
  const username = formData.get("username") as string | null;
  const password = formData.get("password") as string | null;
  const email = formData.get("email") as string | null;
  try {
    // Aqui é um bom momento para verificações, pq verificações de servidor não tem
    // como o usuário escapar delas. A biblioteca zod é uma bem utilizada para
    // verificações.
    if (!username || !password || !email) throw new Error("Preencha os dados.");
    if (password.length < 6)
      throw new Error("A senha deve ter mais de 6 dígitos.");

    const { url } = CRIAR_POST();
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Email ou usuário já cadastrado.");
    const { ok } = await login({ ok: true, error: "" }, formData);
    if (!ok) throw new Error("Erro ao logar.");
    return { data: null, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
