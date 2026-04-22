import { Text } from "@/shared/ui";

import styles from "./TaskNavigation.module.css";

export default function TaskNavigation({ title, children }) {
  return (
    <div className={styles.panelListItem}>
      <Text text={title} className={styles.panelListName} />
      {children}
    </div>
  );
}
