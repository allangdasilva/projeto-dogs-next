"use client";
import React from "react";
import FeedSvg from "@/icons/feed-icon";
import EstatisticasSvg from "@/icons/estatisticas.icon";
import AdicionarSvg from "@/icons/adicionar-icon";
import SairSvg from "@/icons/sair-icon";
import styles from "./ContaHeader.module.css";
import useMedia from "@/hooks/useMedia";
import { usePathname } from "next/navigation";
import Link from "next/link";
import logout from "@/actions/logout";

function getTitle(pathname: string) {
  switch (pathname) {
    case "/conta/postar":
      return "Poste Sua Foto";
    case "/conta/estatisticas":
      return "Estatísticas";
    default:
      return "Minha Conta";
  }
}

export function ContaHeader() {
  // const {setUserState} = useUser()
  async function handleLogout() {
    await logout();
    // Com a api window vai acontecer um hard refresh, caso não queira um hard refresh
    // use o Contexto, trazendo o userState para null novamente e continuar usando
    // o redirect para redirecionar na action. ex:
    // setUserState(null)
    window.location.href = "/login";
  }

  const mobile = useMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const pathname = usePathname();

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      <header className={styles.header}>
        <h1 className="title">{getTitle(pathname)}</h1>
        {mobile && (
          <button
            aria-label="Menu"
            className={`${styles.mobileButton} ${
              mobileMenu && styles.mobileButtonActive
            }`}
            onClick={() => setMobileMenu(!mobileMenu)}
          ></button>
        )}

        <nav
          className={`${mobile ? styles.navMobile : styles.nav} ${
            mobileMenu && styles.navMobileActive
          } ${!mobile && "headerNav"}`}
        >
          <Link
            href={"/conta"}
            className={pathname === "/conta" ? "active" : ""}
          >
            <FeedSvg />
            {mobile && "Minha Fotos"}
          </Link>
          <Link
            href={"/conta/estatisticas"}
            className={pathname === "/conta/estatisticas" ? "active" : ""}
          >
            <EstatisticasSvg />
            {mobile && "Estatísticas"}
          </Link>
          <Link
            href={"/conta/postar"}
            className={pathname === "/conta/postar" ? "active" : ""}
          >
            <AdicionarSvg />
            {mobile && "Adicionar Foto"}
          </Link>
          <button onClick={handleLogout}>
            <SairSvg />
            {mobile && "Sair"}
          </button>
        </nav>
      </header>
    </>
  );
}
