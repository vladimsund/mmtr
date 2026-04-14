import { useBoardContext } from "@/entities";

export default function useTask() {
  const { boards, setBoards, activeBoardId } = useBoardContext();

  function updateTasks(listId, updateFn) {
    const updatedBoards = [];
    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];
      if (board.id === activeBoardId) {
        const updatedLists = [];
        for (let j = 0; j < board.lists.length; j++) {
          const list = board.lists[j];
          if (list.id === listId) {
            updatedLists.push({ ...list, tasks: updateFn(list.tasks) });
          } else {
            updatedLists.push(list);
          }
        }
        updatedBoards.push({ ...board, lists: updatedLists });
      } else {
        updatedBoards.push(board);
      }
    }
    setBoards(updatedBoards);
  }

  function addTask(text, listId) {
    updateTasks(listId, (tasks) => {
      const newTasks = [];
      for (let i = 0; i < tasks.length; i++) {
        newTasks.push(tasks[i]);
      }
      newTasks.push({ id: Date.now(), text, isActive: true });
      return newTasks;
    });
  }

  function editTask(newText, taskId, listId) {
    updateTasks(listId, (tasks) => {
      const updated = [];
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
          updated.push({ ...tasks[i], text: newText });
        } else {
          updated.push(tasks[i]);
        }
      }
      return updated;
    });
  }

  function deleteTask(taskId, listId) {
    updateTasks(listId, (tasks) => {
      const filtered = [];
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== taskId) {
          filtered.push(tasks[i]);
        }
      }
      return filtered;
    });
  }

  function changeStatus(taskId, listId) {
    updateTasks(listId, (tasks) => {
      const updated = [];
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
          updated.push({ ...tasks[i], isActive: !tasks[i].isActive });
        } else {
          updated.push(tasks[i]);
        }
      }
      return updated;
    });
  }

  return {
    addTask,
    editTask,
    deleteTask,
    changeStatus,
  };
}
