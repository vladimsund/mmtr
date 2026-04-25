import { Modal } from "@/shared/ui";
import { useBoard } from "@/entities/board";

export default function CreateBoardModal({ isOpen, handleCloseModal }) {
  const board = useBoard();

  function saveBoard(name) {
    board.handleSave(name);
    handleCloseModal();
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Создать доску"
      onClose={handleCloseModal}
      onSave={saveBoard}
    />
  );
}
