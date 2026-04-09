import { useState } from "react";
import clsx from "clsx";

import { Input, penDark, crossDark } from "@/shared";

import styles from "./EditableBar.module.css";

export default function EditableBar({ id, title, onEdit, onDelete, onClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  function handleClick() {
    onClick(id);
  }

  function handleSave(e) {
    if (e) {
      stopPropagation(e);
    }

    const trimmedValue = value.trim();
    if (trimmedValue && trimmedValue !== title) {
      onEdit(id, trimmedValue);
    }

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
        <span className={styles.name}>{title}</span>
      )}
      <div className={styles.icons}>
        <div className={styles.iconContainer} onClick={handleEdit}>
          <img src={penDark} alt="edit" className={styles.icon} />
        </div>
        <div className={styles.iconContainer} onClick={handleDelete}>
          <img src={crossDark} alt="delete" className={styles.icon} />
        </div>
      </div>
    </div>
  );
}
