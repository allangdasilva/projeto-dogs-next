"use server";

import { USUARIO_GET } from "@/functions/api";
import apiError from "@/functions/apiError";
import { cookies } from "next/headers";

export type Usuario = {
  id: number;
  email: string;
  username: string;
  nome: string;
};

export default async function getUsuario() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");

    const { url } = USUARIO_GET();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
        revalidate: 60,
      },
    });
    if (!response.ok) throw new Error("Erro ao pegar usuário.");
    const data = (await response.json()) as Usuario;
    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
