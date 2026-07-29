import { Field, Text, Button, ErrorForm } from "@/shared/ui";

import { useRegisterForm } from "../model/useRegisterForm";

import styles from "./RegisterForm.module.css";

export function RegisterForm() {
  const {
    form,
    errors,
    handleChangeName,
    handleChangeEmail,
    handleChangePassword,
    handleChangeConfirm,
    handleRegisterClick,
    handleNavigateTo,
  } = useRegisterForm();

  return (
    <div className={styles.form}>
      <Field
        label="Имя"
        value={form.name}
        onChange={handleChangeName}
        error={errors.login}
        placeholder="vladimund"
      />
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
      <Field
        label="Подтвердите пароль"
        type="password"
        value={form.confirmPassword}
        onChange={handleChangeConfirm}
        error={errors.confirm}
        placeholder="********"
      />
      <Button
        text="Зарегистрировать"
        onClick={handleRegisterClick}
        className={styles.button}
      ></Button>
      <ErrorForm message={errors.api} />
      <div className={styles.hint}>
        <Text className={styles.account} text={"Есть аккаунт?"} />
        <Text
          className={styles.authLink}
          text="Войти"
          onClick={handleNavigateTo}
        />
      </div>
    </div>
  );
}
