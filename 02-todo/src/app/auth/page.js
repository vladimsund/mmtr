'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import styles from './page.module.css';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorApi, setErrorApi] = useState('');

  const emailValid = (val) => {
    setEmail(val);
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(val)) {
      setErrorEmail('Некорректный формат почты');
    } else {
      setErrorEmail('');
    }
  };

  const passwordValid = (val) => {
    setPassword(val);
    setErrorPassword(val.length < 6 ? 'Пароль слишком короткий' : '');
  };

  const handleLoginClick = () => {
    setErrorApi('');
    if (!errorEmail && !errorPassword && email && password) {
      console.log('Данные формы:', { email, password });
      setErrorApi('');
    } else {
      setErrorApi('Проверьте корректность введенных данных');
    }
  };

  return (
    <div className={styles['auth']}>
      <div className={`${styles['auth__title']} fw-bold`}>Войдите в аккаунт</div>
      <div className={styles['auth__form']}>
        <div className={styles['auth__field']}>
          <div className={styles['auth__label']}>Почта</div>
          <input
            type="email"
            value={email}
            onChange={(e) => emailValid(e.target.value)}
            className={styles['auth__input']}
            placeholder="vladimsov@gmail.com"
          />
          <div className={styles['auth__error']}>{errorEmail}</div>
        </div>
        <div className={styles['auth__field']}>
          <div className={styles['auth__label']}>Пароль</div>
          <input
            value={password}
            onChange={(e) => passwordValid(e.target.value)}
            type="password"
            className={styles['auth__input']}
            placeholder="********"
          />
          <div className={styles['auth__error']}>{errorPassword}</div>
        </div>
        <button type="button" onClick={handleLoginClick} className={styles['auth__button']}>
          Войти
        </button>
        <div className={styles['auth__error']}>{errorApi}</div>
        <div className={styles['auth__hint']}>
          <span className={styles['auth__account-text']}>Нет аккаунта? </span>
          <Link href={ROUTES.REGISTER} className={styles['auth__register-link']}>
            Зарегистрировать
          </Link>
        </div>
      </div>
    </div>
  );
}
