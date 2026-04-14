import useAuthPage from "../model/useAuthPage";

import { Field, Text, Button, ErrorForm } from "@/shared";

import styles from "./AuthPage.module.css";

export default function AuthPage() {
  const {
    form,
    errors,
    handleChangeEmail,
    handleChangePassword,
    handleLoginClick,
    handleNavigateTo,
  } = useAuthPage();

  return (
    <div className={styles.auth}>
      <Text className={styles.title} text={"Войдите в аккаунт"} />
      <div className={styles.form}>
        <Field
          label="Почта"
          type="email"
          value={form.email}
          onChange={handleChangeEmail}
          error={errors.email}
          placeholder="vladimsov@gmail.com"
        />
        <Field
          label="Пароль"
          type="password"
          value={form.password}
          onChange={handleChangePassword}
          error={errors.password}
          placeholder="********"
        />
        <Button
          text="Войти"
          onClick={handleLoginClick}
          className={styles.button}
        ></Button>
        <ErrorForm message={errors.api} />
        <div className={styles.hint}>
          <Text className={styles.account} text={"Нет аккаунта?"} />
          <Text
            className={styles.registerLink}
            text="Зарегистрировать"
            onClick={handleNavigateTo}
          />
        </div>
      </div>
    </div>
  );
}
