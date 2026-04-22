import { Text } from "@/shared/ui";
import { TaskNavigation, Task } from "@/entities/task";

import styles from "./TaskListGroup.module.css";

export default function TaskListGroup({
  list,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) {
  function handleAddClick() {
    onAddTask(list.id);
  }

  return (
    <TaskNavigation title={list.name}>
      {list.tasks.map((task) => (
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
    </TaskNavigation>
  );
}
