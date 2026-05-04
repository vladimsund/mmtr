import { useParams } from "react-router";

import { useTask, TaskListGroup } from "@/entities/task";
import { useList } from "@/entities/list";

import styles from "./TaskPanel.module.css";

export default function TaskPanel({ onAddTask }) {
  const { id: boardId } = useParams();

  const list = useList(boardId);
  const task = useTask(boardId);

  const sortedLists = [...list.lists].sort((a, b) => a.order - b.order);

  function getListTasks(listId) {
    return task.tasks.filter((task) => task.listId === listId);
  }

  return (
    <div className={styles.panelList}>
      {sortedLists.map((list) => (
        <TaskListGroup
          key={list.id}
          list={list}
          tasks={getListTasks(list.id)}
          onAddTask={onAddTask}
          onEditTask={task.handleEdit}
          onDeleteTask={task.handleDelete}
        />
      ))}
    </div>
  );
}
