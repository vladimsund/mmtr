export const useDnD = (currentBoard, boards, setBoards) => {
  const onDragStart = (e, taskId, fromListId) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("fromId", fromListId);
  };

  const onDrop = (e, toListId) => {
    e.preventDefault();
    const taskId = Number(e.dataTransfer.getData("taskId"));
    const fromId = Number(e.dataTransfer.getData("fromId"));

    if (fromId === toListId) {
      return;
    }

    let taskToMove = null;
    for (let list of currentBoard.lists) {
      if (list.id === fromId) {
        for (let task of list.tasks) {
          if (task.id === taskId) {
            taskToMove = task;
            break;
          }
        }
      }
    }

    const newLists = [];
    for (let list of currentBoard.lists) {
      if (list.id === fromId) {
        const updatedTasks = [];
        for (let task of list.tasks) {
          if (task.id !== taskId) {
            updatedTasks.push(task);
          }
        }
        newLists.push({ ...list, tasks: updatedTasks });
      } else if (list.id === toListId) {
        newLists.push({ ...list, tasks: [...list.tasks, taskToMove] });
      } else {
        newLists.push(list);
      }
    }

    const updatedBoards = [];
    for (let b of boards) {
      if (b.id === currentBoard.id) {
        updatedBoards.push({ ...b, lists: newLists });
      } else {
        updatedBoards.push(b);
      }
    }
    setBoards(updatedBoards);
  };

  return { onDragStart, onDrop };
};
