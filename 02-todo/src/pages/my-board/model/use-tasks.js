export default function useBoardTasks(
  updateListsInBoard,
  activeListId,
  handleCloseModal,
) {
  function updateTasksInBoard(listId, taskCallback) {
    updateListsInBoard((lists) =>
      lists.map((list) =>
        list.id === listId
          ? { ...list, tasks: taskCallback(list.tasks) }
          : list,
      ),
    );
  }

  function handleAddTask(text) {
    if (!text.trim()) {
      return;
    }

    updateTasksInBoard(activeListId, (tasks) => [
      ...tasks,
      { id: Date.now(), text, isActive: true },
    ]);

    handleCloseModal();
  }

  function handleEditTask(e, newText) {
    const taskElement = e.target.closest("[data-task-id]");
    if (!taskElement) {
      return;
    }

    const taskId = Number(taskElement.dataset.taskId);
    const listId = Number(taskElement.dataset.fromListId);

    updateTasksInBoard(listId, (tasks) =>
      tasks.map((t) => (t.id === taskId ? { ...t, text: newText } : t)),
    );
  }

  function handleDeleteTask(e) {
    const taskElement = e.currentTarget.closest("[data-task-id]");
    const taskId = Number(taskElement.dataset.taskId);
    const listId = Number(taskElement.dataset.fromListId);

    updateTasksInBoard(listId, (tasks) => tasks.filter((t) => t.id !== taskId));
  }

  function handleChangeStatus(e) {
    const taskElement = e.currentTarget.closest("[data-task-id]");
    const taskId = Number(taskElement.dataset.taskId);
    const listId = Number(taskElement.dataset.fromListId);

    updateTasksInBoard(listId, (tasks) =>
      tasks.map((t) => (t.id === taskId ? { ...t, isActive: !t.isActive } : t)),
    );
  }

  return {
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleChangeStatus,
  };
}
