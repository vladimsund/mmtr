import { Text } from "@/shared";

import styles from "./ErrorForm.module.css";

export default function ErrorForm({ message }) {
  return (
    <div className={styles.errorForm}>
      <Text text={message} className={styles.label} />
    </div>
  );
}
