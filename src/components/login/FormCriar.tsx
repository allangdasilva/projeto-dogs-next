"use client";

import { useFormStatus } from "react-dom";
import Button from "../forms/Button";
import React, { useActionState } from "react";
import Input from "@/components/forms/Input";
import ErrorMessage from "../helper/ErrorMessage";
import styles from "./FormLogin.module.css";
import criarPost from "@/actions/post-criar";

function ButtonForm() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled={pending}>Carregando...</Button>
      ) : (
        <Button>Cadastrar</Button>
      )}
    </>
  );
}
export default function FormCriar() {
  const [state, action] = useActionState(criarPost, {
    ok: false,
    error: "",
    data: null,
  });

  React.useEffect(() => {
    if (state.ok) window.location.href = "/conta";
  }, [state.ok]);

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="Usuário" name="username" type="text" />
        <Input label="Email" name="email" type="email" />
        <Input label="Senha" name="password" type="password" />
        <ErrorMessage error={state.error} />
        <ButtonForm />
      </form>
    </>
  );
}
