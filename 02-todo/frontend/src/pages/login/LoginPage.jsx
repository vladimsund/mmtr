import { Text } from "@/shared/ui";
import { LoginForm } from "@/features/login";

import styles from "./LoginPage.module.css";

export function LoginPage() {
  return (
    <div className={styles.auth}>
      <Text className={styles.title} text="Войдите в аккаунт" />
      <LoginForm />
    </div>
  );
}
