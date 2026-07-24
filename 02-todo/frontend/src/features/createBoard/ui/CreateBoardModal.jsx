import { Modal } from "@/shared/ui";
import { useBoard } from "@/entities/board";

export function CreateBoardModal({ isOpen, onCloseModal }) {
  const board = useBoard();

  function saveBoard(name) {
    board.handleSave(name);
    onCloseModal();
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Создать доску"
      onClose={onCloseModal}
      onSave={saveBoard}
    />
  );
}
