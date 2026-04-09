import useBoardsPage from "../model/use-boards-page";

import { Modal, AddButton } from "@/shared";
import { Board } from "@/entities";

import styles from "./Boards.module.css";

export default function Boards() {
  const {
    boards,
    isModalOpen,
    handleEditBoardName,
    handleDelete,
    handleSaveNewBoard,
    handleBoardClick,
    handleOpenModal,
    handleCloseModal,
  } = useBoardsPage();

  return (
    <div className={styles.boards}>
      <div className={styles.left}>
        <div className={styles.container}>
          <div className={styles.title}>Мои доски</div>
          <div className={styles.list}>
            {boards.map((board) => (
              <div key={board.id} className={styles.listItem}>
                <Board
                  id={board.id}
                  title={board.name}
                  onEdit={handleEditBoardName}
                  onDelete={handleDelete}
                  onClick={handleBoardClick}
                />
              </div>
            ))}
          </div>
          <AddButton text="Новая доска" onClick={handleOpenModal} />
        </div>
      </div>
      <div className={styles.right}>
        {isModalOpen && (
          <Modal
            title="Создать доску"
            onClose={handleCloseModal}
            onSave={handleSaveNewBoard}
          />
        )}
      </div>
    </div>
  );
}
