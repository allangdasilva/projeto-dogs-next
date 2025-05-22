"use client";
import { Comentario } from "@/actions/get-foto";
import { useFormStatus } from "react-dom";
import styles from "./FotoComentariosForm.module.css";
import EnviarIcon from "@/icons/enviar-icon";
import ErrorMessage from "../helper/ErrorMessage";
import React, { useActionState } from "react";
import comentarioPost from "@/actions/post-comentario";

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.button} disabled={pending}>
      <EnviarIcon />
    </button>
  );
}

export default function FotoComentariosForm({
  single,
  id,
  setComments,
}: {
  single: boolean;
  id: number;
  setComments: React.Dispatch<React.SetStateAction<Comentario[]>>;
}) {
  const [state, action] = useActionState(comentarioPost, {
    ok: false,
    data: null,
    error: "",
  });
  const [comment, setComment] = React.useState("");
  React.useEffect(() => {
    if (state.ok && state.data) {
      setComments((comments) => [...comments, state.data]);
      setComment("");
    }
  }, [state, setComments]);
  return (
    <>
      <form
        action={action}
        className={`${styles.form} ${single ? styles.single : ""}`}
      >
        <input type="hidden" name="id" id="id" value={id} />
        <textarea
          className={styles.textarea}
          name="comment"
          id="comment"
          placeholder="Comente..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        ></textarea>
        <FormButton />
        <ErrorMessage error={state.error} />
      </form>
    </>
  );
}
