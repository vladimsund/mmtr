import { Text } from "@/shared/ui";
import { Task } from "@/entities/task";

import styles from "./TaskListGroup.module.css";

export default function TaskListGroup({
  list,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) {
  function handleAddClick() {
    onAddTask(list.id);
  }

  return (
    <div className={styles.panelListItem}>
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
