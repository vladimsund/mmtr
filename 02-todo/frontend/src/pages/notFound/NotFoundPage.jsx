import { Text } from "@/shared";

import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
  return <Text text="Не найдено" className={styles.notFound} />;
}
