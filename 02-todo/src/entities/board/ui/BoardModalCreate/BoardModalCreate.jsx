import { Modal } from "@/shared/ui";
import { useBoard } from "@/entities/board";

export default function CreateBoardModal({ isOpen, handleCloseModal }) {
  const { handleSave } = useBoard();

  function saveBoard(name) {
    handleSave(name);
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
