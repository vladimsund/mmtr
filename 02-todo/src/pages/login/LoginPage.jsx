import { Field, Text, Button, ErrorForm } from "@/shared/ui";
import { LoginForm } from "@/entities/user";

import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={styles.auth}>
      <Text className={styles.title} text="Войдите в аккаунт" />
      <LoginForm />
    </div>
  );
}
