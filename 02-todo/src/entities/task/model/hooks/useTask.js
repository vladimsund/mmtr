import { useSelector, useDispatch } from "react-redux";

import { allLists } from "@/entities/list";

import { allTasks } from "../selectors/taskSelector";
import { addTask, editTask, deleteTask } from "../slices/taskSlice";

export default function useTask(boardId) {
  const dispatch = useDispatch();

  const lists = useSelector(allLists);
  const tasks = useSelector(allTasks);

  const listsWithTasks = [];
  for (let i = 0; i < lists.length; i++) {
    listsWithTasks[i] = { ...lists[i] };
    listsWithTasks[i].tasks = tasks.filter(
      (task) => task.listId === lists[i].id,
    );
  }

  function handleEditTask(taskId, listId, name, isActive) {
    dispatch(editTask({ boardId, listId, taskId, isActive, name }));
  }

  function handleDeleteTask(taskId, listId) {
    dispatch(deleteTask({ boardId, listId, taskId }));
  }

  function handleAddTask(boardId, listId, name) {
    dispatch(addTask({ boardId, listId, name }));
  }

  return {
    lists: listsWithTasks,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
  };
}
