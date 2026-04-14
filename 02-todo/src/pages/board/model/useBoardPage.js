import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useBoardContext, useTask, useList } from "@/entities";

export default function useBoardPage() {
  const { boards, setActiveBoardId } = useBoardContext();
  const { id } = useParams();
  const currentBoardId = Number(id);
  const currentBoard = boards.find((b) => b.id === currentBoardId);

  useEffect(() => {
    if (currentBoardId) {
      setActiveBoardId(currentBoardId);
    }
  }, [currentBoardId, setActiveBoardId]);

  const { addTask, editTask, deleteTask, changeStatus } = useTask();
  const { addList, editList, deleteList } = useList();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeListId, setActiveListId] = useState(null);

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleOnSave(text) {
    if (activeListId) {
      handleAddTask(text, activeListId);
    } else {
      handleAddList(text);
    }
  }

  function handleOpenAddList() {
    setActiveListId(null);
    handleOpenModal();
  }

  function handleOpenAddTask(listId) {
    return function () {
      setActiveListId(listId);
      handleOpenModal();
    };
  }

  function handleAddList(title) {
    addList(title);
    handleCloseModal();
  }

  function handleEditList(id, text) {
    editList(id, text);
  }

  function handleDeleteList(id) {
    deleteList(id);
  }

  function handleAddTask(text) {
    addTask(text, activeListId);
    handleCloseModal();
  }

  function handleEditTask(taskId, listId) {
    return function (newText) {
      editTask(newText, taskId, listId);
    };
  }

  function handleDeleteTask(taskId, listId) {
    return function () {
      deleteTask(taskId, listId);
    };
  }

  function handleChangeStatusTask(taskId, listId) {
    return function () {
      changeStatus(taskId, listId);
    };
  }

  return {
    currentBoard,
    modal: {
      isModalOpen,
      activeListId,
      handleOpenAddList,
      handleOpenAddTask,
      handleCloseModal,
      handleOnSave,
    },
    taskHandlers: {
      handleEditTask,
      handleDeleteTask,
      handleChangeStatusTask,
    },
    listHandlers: {
      handleEditList,
      handleDeleteList,
    },
  };
}
