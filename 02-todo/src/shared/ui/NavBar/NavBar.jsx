import { EditableBar, Text } from "@/shared";

import styles from "./NavBar.module.css";

export default function NavBar({
  title,
  elements,
  onEdit,
  onDelete,
  onClick,
  titleAdd,
  onAdd,
}) {
  const newElements = [];
  for (let i = 0; i < elements.length; i++) {
    const item = elements[i];
    if (item.title === undefined) {
      newElements.push({ ...item, title: item.name });
    } else {
      newElements.push(item);
    }
  }

  return (
    <div className={styles.lists}>
      <Text text={title} className={styles.title}></Text>
      {newElements.map((element) => (
        <EditableBar
          key={element.id}
          id={element.id}
          title={element.title}
          onEdit={(id, text) => onEdit(id, text)}
          onDelete={(id) => onDelete(id)}
          onClick={(id) => onClick(id)}
        />
      ))}
      <Text onClick={onAdd} text={titleAdd} className={styles.textNew}></Text>
    </div>
  );
}
