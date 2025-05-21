"use client";

import { useFormStatus } from "react-dom";
import Button from "../forms/Button";
import React, { useActionState } from "react";
import Input from "@/components/forms/Input";
import ErrorMessage from "../helper/ErrorMessage";
import styles from "./ContaPostar.module.css";
import fotoPost from "@/actions/post-foto";

function ButtonForm() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled={pending}>Carregando...</Button>
      ) : (
        <Button>Postar</Button>
      )}
    </>
  );
}
export default function ContaPostar() {
  const [state, action] = useActionState(fotoPost, {
    ok: false,
    error: "",
    data: null,
  });
  const [img, setImg] = React.useState("");
  function handleImgChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files) {
      setImg(URL.createObjectURL(target.files[0]));
    }
  }

  return (
    <>
      <section className={`${styles.photoPost} animeLeft`}>
        <form action={action}>
          <Input label="Nome" name="nome" type="text" />
          <Input label="Peso" name="peso" type="number" />
          <Input label="Idade" name="idade" type="number" />
          <input
            onChange={handleImgChange}
            type="file"
            name="img"
            id="img"
            className={styles.file}
          />
          <ErrorMessage error={state.error} />
          <ButtonForm />
        </form>
        <div>
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        </div>
      </section>
    </>
  );
}
