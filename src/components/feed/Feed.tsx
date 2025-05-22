"use client";
import getFotos, { Foto } from "@/actions/get-fotos";
import FeedFotos from "./FeedFotos";
import React from "react";
import Loading from "../helper/Loading";
import styles from "./FeedFotos.module.css";

export default function Feed({
  fotos,
  user,
}: {
  fotos: Foto[];
  user?: 0 | string;
}) {
  const [photosFeed, setPhotosFeed] = React.useState<Foto[]>(fotos);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [infinite, setInfinite] = React.useState(
    fotos.length < 6 ? false : true
  );
  const fetching = React.useRef(false);

  function infiniteScroll() {
    if (fetching.current) return;
    fetching.current = true;
    setLoading(true);
    setTimeout(() => {
      setPage((currentPage) => currentPage + 1);
      fetching.current = false;
      setLoading(false);
    }, 1000);
  }

  React.useEffect(() => {
    if (page === 1) return;
    async function getPagePhotos(page: number) {
      const actionData = await getFotos(
        { page, total: 6, user: user },
        { cache: "no-store" }
      );
      if (actionData && actionData.data !== null) {
        const { data } = actionData;
        setPhotosFeed((currentPhoto) => [...currentPhoto, ...data]);
        if (data.length < 6) setInfinite(false);
      }
    }
    getPagePhotos(page);
  }, [page, user]);

  React.useEffect(() => {
    if (infinite) {
      window.addEventListener("scroll", infiniteScroll);
      window.addEventListener("wheel", infiniteScroll);
    } else {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
    }
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
    };
  }, [infinite]);
  return (
    <>
      <div className="animeLeft">
        <FeedFotos fotos={photosFeed} />
        <div className={styles.loadingWrapper}>
          {infinite ? (
            loading && <Loading />
          ) : (
            <p>Não existe mais postagens.</p>
          )}
        </div>
      </div>
    </>
  );
}
