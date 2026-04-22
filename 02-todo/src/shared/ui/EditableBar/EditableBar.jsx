import { useState } from "react";
import clsx from "clsx";

import { penDark, crossDark } from "@/shared/assets";
import { Input, Icon, Text } from "@/shared/ui";

import styles from "./EditableBar.module.css";

export default function EditableBar({ id, title, onEdit, onDelete, onClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  function handleClick() {
    if (onClick) {
      onClick(id);
    }
  }

  function handleSave() {
    onEdit(value, id);
    setIsEditing(false);
  }

  function handleEdit(e) {
    stopPropagation(e);
    setIsEditing(true);
  }

  function handleDelete(e) {
    stopPropagation(e);
    onDelete(id);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSave(e);
    }
  }

  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <div
      className={clsx(styles.edit, isEditing ? styles.activeEditing : false)}
      onClick={handleClick}
    >
      {isEditing ? (
        <Input
          variant="underlined"
          autoFocus
          value={value}
          onChange={setValue}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Text text={title} className={styles.name} />
      )}
      <div className={styles.icons}>
        <Icon
          src={penDark}
          alt="edit"
          onClick={handleEdit}
          className={styles.iconContainer}
        />
        <Icon
          src={crossDark}
          alt="delete"
          onClick={handleDelete}
          className={styles.iconContainer}
        />
      </div>
    </div>
  );
}
