import { useParams } from "react-router";

import { BoardLabel } from "@/entities";
import { useList } from "@/entities/list";
import { NavBar } from "@/shared";

export default function ListNavigation({ onAddList }) {
  const { id: boardId } = useParams();
  const { lists, handleEditList, handleDeleteList } = useList(boardId);

  return (
    <div>
      <BoardLabel />
      <NavBar
        title="Мои списки"
        elements={lists}
        onEdit={handleEditList}
        onDelete={handleDeleteList}
        titleAdd="+ Добавить список"
        onAdd={onAddList}
      />
    </div>
  );
}
