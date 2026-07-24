import { Input, Text } from "@/shared";

import styles from "./Field.module.css";

export function Field({ label, error, ...props }) {
  return (
    <div className={styles.field}>
      <Text text={label} className={styles.label} />
      <Input {...props} />
      <Text text={error} className={styles.error} />
    </div>
  );
}
