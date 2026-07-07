import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

import { useUser } from "@/entities/user";
import { ROUTES } from "@/shared/constants";
import { home, homeActive } from "@/shared/assets";

import styles from "./Header.module.css";

export default function Header() {
  const { pathname } = useLocation();
  const { handleLogout, isUserAuth } = useUser();

  const isHomeActive =
    pathname === ROUTES.BOARDS || pathname.startsWith("/board/");

  const homeIcon = isHomeActive ? homeActive : home;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to={ROUTES.BOARDS} className={clsx(styles.link, styles.linkLogo)}>
          <img src={homeIcon} alt="Главная" className={styles.image} />
        </Link>
        {!isUserAuth ? (
          <>
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
          </>
        ) : (
          <Link
            to={ROUTES.AUTH}
            className={clsx(styles.link, styles.linkButton)}
            onClick={handleLogout}
          >
            Выйти
          </Link>
        )}
      </nav>
    </header>
  );
}
