import { Text } from "@/shared";

import styles from "./BoardList.module.css";

export default function BoardList({ title, children }) {
  return (
    <div className={styles.panelListItem}>
      <Text text={title} className={styles.panelListName} />
      {children}
    </div>
  );
}
