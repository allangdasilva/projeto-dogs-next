import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";
import getUsuario from "@/actions/get-usuario";

export default async function Header() {
  const { data } = await getUsuario();
  return (
    <>
      <header className={styles.header}>
        <nav className={`${styles.nav} container`}>
          <Link className={styles.logo} href={`/`}>
            <Image
              src={`/imagens/dogs.svg`}
              alt={`Dogs`}
              width={`28`}
              height={`22`}
              priority
            />
          </Link>
          {data ? (
            <Link className={styles.login} href={`/conta`}>
              {data.username}
            </Link>
          ) : (
            <Link className={styles.login} href={`/login`}>
              Login / Criar
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}
