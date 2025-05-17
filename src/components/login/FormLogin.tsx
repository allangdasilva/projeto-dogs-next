"use client";

import login from "@/actions/login";
import { useFormStatus } from "react-dom";
import Button from "../forms/Button";
import { useActionState } from "react";

function ButtonForm() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled={pending}>Carregando...</Button>
      ) : (
        <Button>Entrar</Button>
      )}
    </>
  );
}
export default function FormLogin() {
  const [state, action] = useActionState(login, {
    ok: false,
    error: "",
    data: null,
  });
  return (
    <>
      {/* Se passamos a action aqui, o que a action irá receber é o FormData com as informações desse formulário  */}
      <form action={action}>
        <input type="text" name="username" placeholder="usuário" />
        <input type="password" name="password" placeholder="senha" />
        <ButtonForm />
        <p>{state.error}</p>
      </form>
    </>
  );
}
