import { useState, useEffect } from "react";

import { Text } from "@/shared/ui";
import { useBoard } from "@/entities/board";
import { CreateBoardModal } from "@/features/createBoard";
import { BoardNavigation } from "@/features/boardNavigation";

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
        <BoardNavigation onAddBoard={handleOpenModal} />
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
