import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <Image
          src={`/imagens/dogs-footer.svg`}
          alt="Dogs"
          width={28}
          height={22}
        />
        <p>Alguns direitos reservados.</p>
      </footer>
    </>
  );
}
