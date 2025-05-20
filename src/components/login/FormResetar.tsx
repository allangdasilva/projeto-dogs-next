"use client";

import { useFormStatus } from "react-dom";
import Button from "../forms/Button";
import React, { useActionState } from "react";
import Input from "@/components/forms/Input";
import ErrorMessage from "../helper/ErrorMessage";
import styles from "./FormLogin.module.css";
import resetarPost from "@/actions/post-resetar";

function ButtonForm() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled={pending}>Carregando...</Button>
      ) : (
        <Button>Resetar Senha</Button>
      )}
    </>
  );
}
export default function FormResetar({
  keyToken,
  login,
}: {
  keyToken: string;
  login: string;
}) {
  const [state, action] = useActionState(resetarPost, {
    ok: false,
    error: "",
    data: null,
  });
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    setUrl(window.location.href.replace("perdeu", "resetar"));
  }, []);

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="Nova Senha" name="password" type="password" />
        <input type="hidden" name="key" value={keyToken} />
        <input type="hidden" name="login" value={login} />
        <ErrorMessage error={state.error} />
        <ButtonForm />
      </form>
    </>
  );
}
