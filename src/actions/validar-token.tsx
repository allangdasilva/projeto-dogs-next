"use server";

import { VALIDAR_TOKEN } from "@/functions/api";
import apiError from "@/functions/apiError";
import { cookies } from "next/headers";

export default async function validarToken() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Acesso negado.");
    const { url } = VALIDAR_TOKEN();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) throw new Error("Erro ao validar token.");
    const data = await response.json();
    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
