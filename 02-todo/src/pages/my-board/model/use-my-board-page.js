import { useState } from "react";
import { useParams } from "react-router-dom";

import useBoardLists from "./use-lists";
import useBoardTasks from "./use-tasks";

import { useBoard } from "@/entities";
import { useDnD } from "@/features";

export default function useBoardPage() {
  const { boards, setBoards } = useBoard();
  const { id } = useParams();
  const currentBoardId = Number(id);
  const currentBoard = boards.find((b) => b.id === currentBoardId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeListId, setActiveListId] = useState(null);
  const { onDragStart, onDrop } = useDnD(currentBoard, boards, setBoards);

  const {
    updateListsInBoard,
    handleAddList,
    handleEditList,
    handleDeleteList,
  } = useBoardLists(currentBoard, setBoards, setIsModalOpen);

  const {
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleChangeStatus,
  } = useBoardTasks(updateListsInBoard, activeListId, setIsModalOpen);

  if (!currentBoard) {
    return null;
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleOpenAddList() {
    setActiveListId(null);
    handleOpenModal();
  }

  function handleOpenAddTask(id) {
    setActiveListId(id);
    handleOpenModal();
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragStart(e) {
    const taskId = Number(e.currentTarget.dataset.taskId);
    const listId = Number(e.currentTarget.dataset.fromListId);
    onDragStart(e, taskId, listId);
  }

  function handleDrop(e) {
    const listId = Number(e.currentTarget.dataset.listId);
    onDrop(e, listId);
  }

  return {
    currentBoard,
    isModalOpen,
    activeListId,
    handleCloseModal,
    handleOpenAddList,
    handleOpenAddTask,
    handleAddList,
    handleEditList,
    handleDeleteList,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleChangeStatus,
    handleDragOver,
    handleDragStart,
    handleDrop,
  };
}
