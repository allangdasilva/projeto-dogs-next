"use server";

import { TOKEN_POST } from "@/functions/api";
import apiError from "@/functions/apiError";
import { cookies } from "next/headers";

// Como foi feito o uso do formState o primeiro argumento é o state, depois o formData
// não é necessário informar o tipo pois não será usado em nenhum momento.
export default async function login(state: {}, formData: FormData) {
  const username = formData.get("username") as string | null;
  const password = formData.get("password") as string | null;
  try {
    // Esse erro será jogado no error.message
    if (!username || !password) throw new Error("Preencha os dados.");
    const { url } = TOKEN_POST();
    const response = await fetch(url, {
      method: "POST",
      // Como estou passando um formData, não precisa fazer o JSON.stringfy, e se não
      // é um JSON eu tiro o headers com o content-type
      body: formData,
    });
    if (!response.ok) throw new Error("Senha ou usuário inválidos.");
    // a resposta desse fetch(POST) é um token caso o usuário e senha
    // fornecidos(formData) sejam verdadeiras, e se não uma mensagem de erro
    const data = await response.json();

    (await cookies()).set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      // 1 dia para esse token expirar
      maxAge: 60 * 60 * 24,
    });
    return { data: null, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
