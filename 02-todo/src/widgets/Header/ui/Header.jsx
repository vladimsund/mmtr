import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

import { ROUTES } from "@/shared";
import { home, homeActive } from "@/shared";

import styles from "./Header.module.css";

export default function Header() {
  const { pathname } = useLocation();

  const isHomeActive =
    pathname === ROUTES.BOARDS || pathname.startsWith("/board/");

  const homeIcon = isHomeActive ? homeActive : home;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to={ROUTES.BOARDS} className={clsx(styles.link, styles.linkLogo)}>
          <img src={homeIcon} alt="Главная" className={styles.image} />
        </Link>
        <Link
          to={ROUTES.AUTH}
          className={clsx(
            styles.link,
            styles.linkButton,
            pathname === ROUTES.AUTH && styles.linkActive,
          )}
        >
          Авторизация
        </Link>
        <Link
          to={ROUTES.REGISTER}
          className={clsx(
            styles.link,
            styles.linkButton,
            pathname === ROUTES.REGISTER && styles.linkActive,
          )}
        >
          Регистрация
        </Link>
      </nav>
    </header>
  );
}
