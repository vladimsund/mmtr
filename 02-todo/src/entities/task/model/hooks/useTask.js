import { useSelector, useDispatch } from "react-redux";

import * as taskApi from "../../api";
import { allTasks, isTasksLoading } from "../selectors";

export default function useTask(boardId) {
  const dispatch = useDispatch();

  const tasks = useSelector(allTasks);
  const isLoading = useSelector(isTasksLoading);

  function handleEdit(taskId, listId, name, isActive) {
    dispatch(taskApi.editTask({ boardId, listId, taskId, isActive, name }));
  }

  function handleDelete(taskId, listId) {
    dispatch(taskApi.deleteTask({ boardId, listId, taskId }));
  }

  async function handleSave(boardId, listId, name) {
    await dispatch(taskApi.addTask({ boardId, listId, name }));
    dispatch(taskApi.fetchTasks({ boardId, listId }));
  }

  function handleReorder(boardId, newListId, taskId, order) {
    dispatch(taskApi.reorderTask({ boardId, newListId, taskId, order }));
  }

  return {
    tasks,
    isLoading,
    handleSave,
    handleEdit,
    handleDelete,
    handleReorder,
  };
}
