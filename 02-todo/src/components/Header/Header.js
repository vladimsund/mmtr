'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const homeIcon =
    pathname === ROUTES.BOARDS || pathname === ROUTES.MYBOARD
      ? '/images/home-active.svg'
      : '/images/home.svg';

  return (
    <header className={styles['header']}>
      <nav className={styles['header__nav']}>
        <Link
          href={ROUTES.BOARDS}
          className={`${styles['header__link']} ${styles['header__link--logo']}`}
        >
          <Image src={homeIcon} alt="Главная" fill className={styles['header__image']} />
        </Link>
        <Link
          href={ROUTES.AUTH}
          className={`${styles['header__link']} ${styles['header__link--button']} ${
            pathname === ROUTES.AUTH ? styles['header__link--active'] : ''
          }`}
        >
          Авторизация
        </Link>
        <Link
          href={ROUTES.REGISTER}
          className={`${styles['header__link']} ${styles['header__link--button']} ${
            pathname === ROUTES.REGISTER ? styles['header__link--active'] : ''
          }`}
        >
          Регистрация
        </Link>
      </nav>
    </header>
  );
}
