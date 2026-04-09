import { Link } from "react-router-dom";

import useRegisterPage from "../model/use-register-page";

import { Input, ROUTES } from "@/shared";

import styles from "./Register.module.css";

export default function Register() {
  const {
    form,
    errors,
    handleChangeLogin,
    handleChangeEmail,
    handleChangePassword,
    handleChangeConfirm,
    handleRegisterClick,
  } = useRegisterPage();

  return (
    <div className={styles.register}>
      <div className={`${styles.title} fw-bold`}>Создайте аккаунт</div>
      <div className={styles.form}>
        <div className={styles.field}>
          <div className={styles.label}>Логин</div>
          <Input
            type="text"
            value={form.login}
            onChange={handleChangeLogin}
            placeholder="vladimund"
          />
          <div className={styles.error}>{errors.login}</div>
        </div>
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
        <div className={styles.field}>
          <div className={styles.label}>Подтвердите пароль</div>
          <Input
            type="password"
            value={form.confirmPassword}
            onChange={handleChangeConfirm}
            placeholder="********"
          />
        </div>
        <button
          type="button"
          onClick={handleRegisterClick}
          className={styles.button}
        >
          Зарегистрировать
        </button>
        <div className={styles.error}>{errors.api}</div>
        <div className={styles.hint}>
          <span className={styles.account}>Есть аккаунт? </span>
          <Link to={ROUTES.AUTH} className={styles.authLink}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}
