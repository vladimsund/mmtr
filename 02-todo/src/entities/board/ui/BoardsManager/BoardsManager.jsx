import { useState } from "react";

import { BoardNavigation, BoardModalCreate } from "@/entities/board";

import styles from "./BoardsManager.module.css";

export default function BoardsManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <BoardNavigation handleOpenModal={handleOpenModal} />
      </div>
      <div className={styles.right}>
        <BoardModalCreate
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </div>
  );
}
