import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/shared";
import { useBoard } from "@/entities";

export default function useBoardsPage() {
  const navigate = useNavigate();
  const { boards, setBoards } = useBoard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleEditBoardName(id, newName) {
    setBoards(boards.map((b) => (b.id === id ? { ...b, name: newName } : b)));
  }

  function handleDelete(id) {
    setBoards(boards.filter((board) => board.id !== id));
  }

  function handleSaveNewBoard(text) {
    if (!text.trim()) {
      return;
    }

    const nextId = Date.now();
    const newBoard = { id: nextId, name: text, lists: [] };
    setBoards([...boards, newBoard]);

    setIsModalOpen(false);
  }

  function handleBoardClick(boardId) {
    navigate(ROUTES.MY_BOARD.replace(":id", boardId));
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return {
    boards,
    isModalOpen,
    handleEditBoardName,
    handleDelete,
    handleSaveNewBoard,
    handleBoardClick,
    handleOpenModal,
    handleCloseModal,
  };
}
