import { Foto } from "@/actions/get-fotos";
import Image from "next/image";
import Link from "next/link";
import styles from "./FeedFotos.module.css";

export default function FeedFotos({ fotos }: { fotos: Foto[] }) {
  return (
    <>
      <ul className={styles.feed}>
        {fotos.map((foto) => (
          <li className={styles.photo} key={foto.id + Math.random()}>
            <Link href={`/foto/${foto.id}`} scroll={false}>
              <Image
                src={`${foto.src}`}
                alt={foto.title}
                width={1500}
                height={1500}
                sizes="80vw"
              />
              <span className={styles.preview}>{foto.acessos}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
