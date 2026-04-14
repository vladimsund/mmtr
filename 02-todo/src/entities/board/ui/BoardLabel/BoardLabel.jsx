import { Text } from "@/shared";

import styles from "./BoardLabel.module.css";

export default function BoardLabel({ name }) {
  return (
    <div className={styles.container}>
      <Text text={"Доска"} className={styles.title} />
      <div className={styles.itemBoard}>
        <Text text={name} className={styles.itemName} />
      </div>
    </div>
  );
}
