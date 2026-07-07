import { useParams } from "react-router";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

import { useTask } from "@/entities/task";
import { penWhite, crossWhite, circleActive, circle } from "@/shared/assets";
import { Input, Icon, Text } from "@/shared/ui";
import { DND_TYPES } from "@/shared/constants";

import styles from "./Task.module.css";

export default function Task({ task, list, onChange, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.name);

  const { id: boardId } = useParams();

  const { handleReorder } = useTask(boardId);

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

  const [, drag] = useDrag({
    type: DND_TYPES.TASK,
    item: { taskId: task.id, listId: list.id },
  });

  const [, drop] = useDrop({
    accept: DND_TYPES.TASK,
    drop(item) {
      const dragId = item.taskId;
      const hoverId = task.id;

      if (dragId === hoverId) {
        return;
      }

      handleReorder(boardId, list.id, item.taskId, task.order);
    },
  });

  return (
    <div ref={drag}>
      <div ref={drop}>
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
      </div>
    </div>
  );
}
