import { EditableBar } from "@/shared";

export default function List({ id, title, onEdit, onDelete, onClick }) {
  return (
    <EditableBar
      id={id}
      title={title}
      onEdit={onEdit}
      onDelete={onDelete}
      onClick={onClick}
    />
  );
}
