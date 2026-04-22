import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/shared/constants";
import { NavBar } from "@/shared/ui";
import { useBoard } from "@/entities/board";

export default function BoardNavigation({ handleOpenModal }) {
  const { boards, handleEdit, handleDelete } = useBoard();

  const navigate = useNavigate();

  function handleClick(boardId) {
    navigate(ROUTES.MY_BOARD.replace(":id", String(boardId)));
  }

  return (
    <NavBar
      title="Мои доски"
      elements={boards}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onClick={handleClick}
      onAdd={handleOpenModal}
      titleAdd="+ Добавить доску"
    />
  );
}
