import { EditableBar, Text } from "@/shared";

import styles from "./NavBar.module.css";

export default function NavBar({
  title,
  elements,
  onEdit,
  onDelete,
  onClick = () => {},
  titleAdd,
  onAdd,
}) {
  function handleEdit(name, id) {
    return onEdit(name, id);
  }

  function handleDelete(id) {
    return onDelete(id);
  }

  function handleClick(id) {
    return onClick(id);
  }

  return (
    <div className={styles.lists}>
      <Text text={title} className={styles.title}></Text>
      {elements.map((element) => (
        <EditableBar
          key={element.id}
          id={element.id}
          title={element.name}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClick={handleClick}
        />
      ))}
      <Text onClick={onAdd} text={titleAdd} className={styles.textNew}></Text>
    </div>
  );
}
