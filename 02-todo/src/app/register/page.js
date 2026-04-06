'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import styles from './page.module.css';
import { Input } from '@/components/Input/Input';

export default function Register() {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorApi, setErrorApi] = useState('');

  const loginValid = (val) => {
    setLogin(val);
    if (val.length < 3) {
      setErrorLogin('Логин слишком короткий');
    } else {
      setErrorLogin('');
    }
  };

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
    if (val.length < 6) {
      setErrorPassword('Пароль должен быть более 6 символов');
    } else {
      setErrorPassword('');
    }
  };

  const handleRegisterClick = () => {
    setErrorApi('');
    if (!errorLogin && !errorEmail && !errorPassword && login && email && password) {
      if (password !== confirmPassword) {
        setErrorApi('Пароли не совпадают');
        return;
      }
      console.log('Данные формы:', { login, email, password });
    } else {
      setErrorApi('Заполните все поля корректно');
    }
  };

  return (
    <div className={styles['register']}>
      <div className={`${styles['register__title']} fw-bold`}>Создайте аккаунт</div>
      <div className={styles['register__form']}>
        <div className={styles['register__field']}>
          <div className={styles['register__label']}>Логин</div>
          <Input type="login" value={login} onChange={loginValid} placeholder="vladimund" />
          <div className={styles['register__error']}>{errorLogin}</div>
        </div>
        <div className={styles['register__field']}>
          <div className={styles['register__label']}>Почта</div>
          <Input
            type="email"
            value={email}
            onChange={emailValid}
            placeholder="vladimsov@gmail.com"
          />
          <div className={styles['register__error']}>{errorEmail}</div>
        </div>
        <div className={styles['register__field']}>
          <div className={styles['register__label']}>Пароль</div>
          <Input type="password" value={password} onChange={passwordValid} placeholder="********" />
          <div className={styles['register__error']}>{errorPassword}</div>
        </div>
        <div className={styles['register__field']}>
          <div className={styles['register__label']}>Подтвердите пароль</div>
          <Input
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="********"
          />
          <div className={styles['register__error']}></div>
        </div>
        <button type="button" onClick={handleRegisterClick} className={styles['register__button']}>
          Зарегистрировать
        </button>
        <div className={styles['register__error']}>{errorApi}</div>
        <div className={styles['register__hint']}>
          <span className={styles['register__account']}>Есть аккаунт? </span>
          <Link href={ROUTES.AUTH} className={styles['register__auth-link']}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}
