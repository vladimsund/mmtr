import { Text } from "@/shared";

import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return <Text text={"Не найдено"} className={styles.notFound} />;
}
