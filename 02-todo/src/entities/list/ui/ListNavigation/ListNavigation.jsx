import { useParams } from "react-router";

import { BoardLabel } from "@/entities";
import { useList } from "@/entities/list";
import { NavBar } from "@/shared";

export default function ListNavigation({ onAddList }) {
  const { id: boardId } = useParams();
  const list = useList(boardId);

  return (
    <div>
      <BoardLabel />
      <NavBar
        title="Мои списки"
        elements={list.lists}
        onEdit={list.handleEdit}
        onDelete={list.handleDelete}
        titleAdd="+ Добавить список"
        onAdd={onAddList}
      />
    </div>
  );
}
