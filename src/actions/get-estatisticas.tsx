"use server";

import { ESTATISTICAS_GET } from "@/functions/api";
import apiError from "@/functions/apiError";
import { cookies } from "next/headers";

export type EstatisticasData = {
  id: number;
  title: string;
  acessos: string;
};
export default async function getEstatisticas() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Acesso negado.");
    const { url } = ESTATISTICAS_GET();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
        revalidate: 60,
      },
    });
    if (!response.ok) throw new Error("Erro ao buscar os dados.");
    const data = (await response.json()) as EstatisticasData[];
    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
