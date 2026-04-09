import { useState } from "react";
import clsx from "clsx";

import { Input, penWhite, crossWhite, circleActive, circle } from "@/shared";

import styles from "./Task.module.css";

export default function Task({ title, isActive, onChange, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  function handleSave(e) {
    const trimmedValue = value.trim();

    if (trimmedValue && trimmedValue !== title) {
      onEdit(e, trimmedValue);
    }

    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSave(e);
    }
  }

  function handleStartEditing() {
    setIsEditing(true);
  }

  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <div className={styles.task}>
      <div className={styles.left}>
        <div className={styles.icon}>
          <img
            src={isActive ? circleActive : circle}
            alt="status"
            onClick={onChange}
          />
        </div>
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
      </div>

      <div className={styles.icons} onClick={stopPropagation}>
        <div className={clsx(styles.icon, styles.iconAction)}>
          <img src={penWhite} alt="edit" onClick={handleStartEditing} />
        </div>
        <div className={clsx(styles.icon, styles.iconAction)}>
          <img src={crossWhite} alt="delete" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
}
