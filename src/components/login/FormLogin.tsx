"use client";

import login from "@/actions/login";
import { useFormStatus } from "react-dom";
import Button from "../forms/Button";
import React, { useActionState } from "react";
import Input from "@/components/forms/Input";
import ErrorMessage from "../helper/ErrorMessage";
import Link from "next/link";
import styles from "./FormLogin.module.css";

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

  React.useEffect(() => {
    if (state.ok) window.location.href = "/conta";
  }, [state.ok]);

  return (
    <>
      {/* Se passamos a action aqui, o que a action irá receber é o FormData com as informações desse formulário  */}
      <form action={action} className={styles.form}>
        <Input label="Usuário" name="username" type="text" />
        <Input label="Senha" name="password" type="password" />
        <ErrorMessage error={state.error} />
        {/* <input type="text" name="username" placeholder="usuário" />
        <input type="password" name="password" placeholder="senha" /> */}
        <ButtonForm />
      </form>
      <Link className={styles.lost} href={`/login/perdeu`}>
        Perdeu a senha?
      </Link>
      <div className={styles.createWrapper}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className="button" href={`/login/criar`}>
          Cadastro
        </Link>
      </div>
    </>
  );
}
