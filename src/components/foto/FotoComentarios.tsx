"use client";

import React from "react";
import styles from "./FotoComentarios.module.css";
import { useUser } from "@/context/user-context";
import FotoComentariosForm from "./FotoComentariosForm";
import { Comentario } from "@/actions/get-foto";

export default function FotoComentarios(props: {
  single: boolean;
  id: number;
  comments: Comentario[];
}) {
  const [comments, setComments] = React.useState(() => props.comments);
  const { user } = useUser();
  const commentsSection = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    if (commentsSection.current) {
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }
  }, [comments]);

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${props.single ? styles.single : ""}`}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {user && (
        <FotoComentariosForm
          single={props.single}
          id={props.id}
          setComments={setComments}
        />
      )}
    </>
  );
}
