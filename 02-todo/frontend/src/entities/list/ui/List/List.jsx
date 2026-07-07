import { useParams } from "react-router";
import { useDrag, useDrop } from "react-dnd";

import { useList } from "@/entities/list";
import { EditableBar } from "@/shared";
import { DND_TYPES } from "@/shared/constants";

export default function List({ element }) {
  const { id: boardId } = useParams();
  const list = useList(boardId);

  function handleEdit(name) {
    list.handleEdit(name, element.id);
  }

  function handleDelete() {
    list.handleDelete(element.id);
  }

  const [, drag] = useDrag({
    type: DND_TYPES.LIST,
    item: { listId: element.id },
  });

  const [, drop] = useDrop({
    accept: DND_TYPES.LIST,
    drop(item) {
      const dragId = item.listId;
      const hoverId = element.id;

      if (dragId === hoverId) {
        return;
      }

      list.handleReorder(boardId, dragId, element.order);
    },
  });

  function dndRefs(el) {
    drag(el);
    drop(el);
  }

  return (
    <div ref={dndRefs}>
      <EditableBar
        id={element.id}
        title={element.name}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
