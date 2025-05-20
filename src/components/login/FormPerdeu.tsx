"use client";

import { useFormStatus } from "react-dom";
import Button from "../forms/Button";
import React, { useActionState } from "react";
import Input from "@/components/forms/Input";
import ErrorMessage from "../helper/ErrorMessage";
import styles from "./FormLogin.module.css";
import perdeuPost from "@/actions/post-perdeu";

function ButtonForm() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled={pending}>Carregando...</Button>
      ) : (
        <Button>Enviar Email</Button>
      )}
    </>
  );
}
export default function FormPerdeu() {
  const [state, action] = useActionState(perdeuPost, {
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
        <Input label="Email / Usuário" name="login" type="text" />
        <input
          // type="hidden" esconde ele para o usuário mas no formData teremos acesso
          type="hidden"
          name="url"
          value={url}
        />
        <ErrorMessage error={state.error} />
        {state.ok ? (
          <p style={{ color: "#4c1" }}>Email enviado.</p>
        ) : (
          <ButtonForm />
        )}
      </form>
    </>
  );
}
