import { useSelector, useDispatch } from "react-redux";

import { allTasks } from "../selectors";
import { fetchTasks, addTask, editTask, deleteTask } from "../../api";

export default function useTask(boardId) {
  const dispatch = useDispatch();

  const tasks = useSelector(allTasks);

  function handleEdit(taskId, listId, name, isActive) {
    dispatch(editTask({ boardId, listId, taskId, isActive, name }));
  }

  function handleDelete(taskId, listId) {
    dispatch(deleteTask({ boardId, listId, taskId }));
  }

  async function handleSave(boardId, listId, name) {
    await dispatch(addTask({ boardId, listId, name }));
    dispatch(fetchTasks({ boardId, listId }));
  }

  return {
    tasks,
    handleSave,
    handleEdit,
    handleDelete,
  };
}
