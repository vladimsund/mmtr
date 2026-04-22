import { useState } from "react";

import { penWhite, crossWhite, circleActive, circle } from "@/shared/assets";
import { Input, Icon, Text } from "@/shared/ui";

import styles from "./Task.module.css";

export default function Task({ task, list, onChange, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.name);

  function handleSave() {
    handleEdit(value);
    setIsEditing(false);
  }

  function handleChange() {
    onChange(task.id, list.id, task.name, !task.isActive);
  }

  function handleEdit(name) {
    onEdit(task.id, list.id, name, task.isActive);
  }

  function handleDelete() {
    onDelete(task.id, list.id);
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
          src={task.isActive ? circleActive : circle}
          alt="status"
          onClick={handleChange}
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
          <Text text={task.name} className={styles.name} />
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
          onClick={handleDelete}
          className={styles.iconAction}
        />
      </div>
    </div>
  );
}
