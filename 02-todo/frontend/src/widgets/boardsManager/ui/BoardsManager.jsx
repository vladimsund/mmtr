import { useState, useEffect } from "react";

import { useBoard, BoardNavigation } from "@/entities/board";
import { Text } from "@/shared/ui";
import { CreateBoardModal } from "@/features/createBoard";

import styles from "./BoardsManager.module.css";

export function BoardsManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const board = useBoard();

  useEffect(() => {
    board.handleFetch();
  }, []);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {board.isLoading ? (
          <Text text="Загрузка досок..." className={styles.loaderBoards} />
        ) : (
          <BoardNavigation onAddBoard={handleOpenModal} />
        )}
      </div>
      <div className={styles.right}>
        <CreateBoardModal
          isOpen={isModalOpen}
          onCloseModal={handleCloseModal}
        />
      </div>
    </div>
  );
}
