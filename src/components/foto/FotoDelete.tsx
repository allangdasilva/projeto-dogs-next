"use client";

import React from "react";
import styles from "./FotoDelete.module.css";
import fotoDelete from "@/actions/delete-foto";

export default function FotoDelete({ id }: { id: string }) {
  const [loading, setLoading] = React.useState(false);
  async function handleClick() {
    setLoading(true);
    const confirm = window.confirm("Tem certeza que deseja deletar essa foto?");
    if (confirm) {
      await fotoDelete(id);
    }
    setLoading(false);
  }
  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>
          Deletar
        </button>
      ) : (
        <button className={styles.delete} onClick={handleClick}>
          Deletar
        </button>
      )}
    </>
  );
}
