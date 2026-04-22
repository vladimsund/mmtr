import { useParams } from "react-router";

import { useTask, TaskListGroup } from "@/entities/task";

import styles from "./TaskPanel.module.css";

export default function TaskPanel({ onAddTask }) {
  const { id: boardId } = useParams();
  const { lists, handleEditTask, handleDeleteTask } = useTask(boardId);

  return (
    <div className={styles.panelList}>
      {lists.map((list) => (
        <TaskListGroup
          key={list.id}
          list={list}
          onAddTask={onAddTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      ))}
    </div>
  );
}
