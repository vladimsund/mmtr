import { useParams } from "react-router";
import { useDrop } from "react-dnd";

import { DND_TYPES } from "@/shared/constants";
import { Text } from "@/shared/ui";
import { Task, useTask } from "@/entities/task";

import styles from "./TaskListGroup.module.css";

export default function TaskListGroup({
  list,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) {
  const { id: boardId } = useParams();
  const { handleReorder } = useTask(boardId);

  tasks.sort((a, b) => a.order - b.order);

  function handleAddClick() {
    onAddTask(list.id);
  }

  const [, drop] = useDrop({
    accept: DND_TYPES.TASK,
    drop(item) {
      if (tasks.length === 0) {
        handleReorder(boardId, list.id, item.taskId, 0);
      }
    },
  });

  return (
    <div ref={drop} className={styles.panelListItem}>
      <Text text={list.name} className={styles.panelListName} />
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          list={list}
          onChange={onEditTask}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
        />
      ))}
      <Text
        text="+ Новая задача"
        onClick={handleAddClick}
        className={styles.textNew}
      />
    </div>
  );
}
