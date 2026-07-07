import { useNavigate } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";

import { useBoard } from "@/entities/board";
import { EditableBar } from "@/shared";
import { DND_TYPES, ROUTES } from "@/shared/constants";

export default function Board({ element }) {
  const board = useBoard();

  const navigate = useNavigate();

  function handleEdit(name) {
    board.handleEdit(name, element.id);
  }

  function handleDelete() {
    board.handleDelete(element.id);
  }

  function handleClick(boardId) {
    navigate(ROUTES.MY_BOARD.replace(":id", String(boardId)));
  }

  const [, drag] = useDrag({
    type: DND_TYPES.BOARD,
    item: { boardId: element.id },
  });

  const [, drop] = useDrop({
    accept: DND_TYPES.BOARD,
    drop(item) {
      const dragId = item.boardId;
      const hoverId = element.id;

      if (dragId === hoverId) {
        return;
      }

      board.handleReorder(dragId, element.order);
    },
  });

  return (
    <div ref={drag}>
      <div ref={drop}>
        <EditableBar
          id={element.id}
          title={element.name}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
