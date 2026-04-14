import { useState } from "react";

import { penWhite, crossWhite, circleActive, circle } from "@/shared/assets";
import { Input, Icon, Text } from "@/shared/ui";

import styles from "./Task.module.css";

export default function Task({ title, isActive, onChange, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  function handleSave() {
    onEdit(value);
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
        <Icon
          src={isActive ? circleActive : circle}
          alt="status"
          onClick={onChange}
          className={styles.icon}
        />
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
      </div>
      <div className={styles.icons} onClick={stopPropagation}>
        <Icon
          src={penWhite}
          alt="edit"
          onClick={handleStartEditing}
          className={styles.iconAction}
        />
        <Icon
          src={crossWhite}
          alt="delete"
          onClick={onDelete}
          className={styles.iconAction}
        />
      </div>
    </div>
  );
}
