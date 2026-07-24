import { useSelector, useDispatch } from "react-redux";

import * as taskApi from "../../api";
import { allTasks, isTasksLoading } from "../selectors";

export default function useTask(boardId) {
  const dispatch = useDispatch();

  const tasks = useSelector(allTasks);
  const isLoading = useSelector(isTasksLoading);

  async function handleFetch(listId) {
    await dispatch(taskApi.fetchTasks({ boardId, listId }));
  }

  async function handleEdit(taskId, listId, name, isActive) {
    await dispatch(
      taskApi.editTask({ boardId, listId, taskId, isActive, name }),
    );
  }

  async function handleDelete(taskId, listId) {
    await dispatch(taskApi.deleteTask({ boardId, listId, taskId }));
  }

  async function handleSave(boardId, listId, name) {
    await dispatch(taskApi.addTask({ boardId, listId, name }));
    handleFetch(listId);
  }

  async function handleReorder(boardId, newListId, taskId, order) {
    await dispatch(taskApi.reorderTask({ boardId, newListId, taskId, order }));
  }

  return {
    tasks,
    isLoading,
    handleFetch,
    handleSave,
    handleEdit,
    handleDelete,
    handleReorder,
  };
}
