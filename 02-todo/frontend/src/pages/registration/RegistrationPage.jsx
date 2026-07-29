import { Text } from "@/shared/ui";
import { RegisterForm } from "@/features/register";

import styles from "./RegistrationPage.module.css";

export function RegistrationPage() {
  return (
    <div className={styles.register}>
      <Text text="Создайте аккаунт" className={styles.title} />
      <RegisterForm />
    </div>
  );
}
