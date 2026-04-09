import { Link } from "react-router-dom";

import useAuthPage from "../model/use-auth-page";

import { ROUTES, Input } from "@/shared";

import styles from "./Auth.module.css";

export default function Auth() {
  const {
    form,
    errors,
    handleChangeEmail,
    handleChangePassword,
    handleLoginClick,
  } = useAuthPage();

  return (
    <div className={styles.auth}>
      <div className={`${styles.title} fw-bold`}>Войдите в аккаунт</div>
      <div className={styles.form}>
        <div className={styles.field}>
          <div className={styles.label}>Почта</div>
          <Input
            type="email"
            value={form.email}
            onChange={handleChangeEmail}
            placeholder="vladimsov@gmail.com"
          />
          <div className={styles.error}>{errors.email}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Пароль</div>
          <Input
            type="password"
            value={form.password}
            onChange={handleChangePassword}
            placeholder="********"
          />
          <div className={styles.error}>{errors.password}</div>
        </div>
        <button
          type="button"
          onClick={handleLoginClick}
          className={styles.button}
        >
          Войти
        </button>
        <div className={styles.error}>{errors.api}</div>
        <div className={styles.hint}>
          <span className={styles.accountText}>Нет аккаунта? </span>
          <Link to={ROUTES.REGISTER} className={styles.registerLink}>
            Зарегистрировать
          </Link>
        </div>
      </div>
    </div>
  );
}
