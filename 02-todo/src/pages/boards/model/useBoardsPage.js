import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/shared";
import { useBoard } from "@/entities";

export default function useBoardsPage() {
  const { boards, editBoard, deleteBoard, saveBoard } = useBoard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  function handleSaveBoard(text) {
    saveBoard(text);
    handleCloseModal();
  }

  function handleEditBoard(id, text) {
    editBoard(id, text);
  }

  function handleDeleteBoard(id) {
    deleteBoard(id);
  }

  function handleClickBoard(boardId) {
    navigate(ROUTES.MY_BOARD.replace(":id", String(boardId)));
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
    actions: {
      handleSaveBoard,
      handleClickBoard,
      handleEditBoard,
      handleDeleteBoard,
      handleOpenModal,
      handleCloseModal,
    },
  };
}
