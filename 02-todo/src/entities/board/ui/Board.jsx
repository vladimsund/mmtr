import { EditableBar } from "@/shared";

export default function Board({ id, title, onEdit, onDelete, onClick }) {
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
