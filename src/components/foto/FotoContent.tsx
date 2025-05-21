"use client";
import React from "react";
import styles from "./FotoContent.module.css";
// import PhotoComments from "./PhotoComments";
import FotoDelete from "./FotoDelete";
import Link from "next/link";
import { useUser } from "@/context/user-context";
import Image from "next/image";
import { FotoData } from "@/actions/get-foto";

export default function FotoContent({
  data,
  single,
}: {
  data: FotoData;
  single: boolean;
}) {
  const { user } = useUser();
  const { comments, photo } = data;

  return (
    <>
      <div className={`${styles.photo} ${single ? styles.single : ""}`}>
        <div className={styles.img}>
          <Image src={photo.src} alt={photo.title} width={1000} height={1000} />
        </div>
        <div className={styles.details}>
          <div>
            <p className={styles.author}>
              {user && user.username === photo.author ? (
                <FotoDelete id={String(photo.id)} />
              ) : (
                <Link href={`/conta/${photo.author}`}>@{photo.author}</Link>
              )}
              <span className={styles.preview}>{photo.acessos}</span>
            </p>
            <h1 className="title">
              <Link href={`/foto/${photo.id}`}>{photo.title}</Link>
            </h1>
            <ul className={styles.attributes}>
              <li>{photo.peso} kg</li>
              <li>
                {photo.idade} {Number(photo.idade) === 1 ? "ano" : "anos"}
              </li>
            </ul>
          </div>
        </div>
        {/* <PhotoComments single={single} id={photo.id} comments={comments} /> */}
      </div>
    </>
  );
}
