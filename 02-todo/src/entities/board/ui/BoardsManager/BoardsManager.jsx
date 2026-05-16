import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useBoard } from "@/entities/board";
import { Text } from "@/shared/ui";

import { BoardNavigation, BoardModalCreate } from "../";
import { fetchBoards } from "../../api";

import styles from "./BoardsManager.module.css";

export default function BoardsManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const board = useBoard();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

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
        <BoardModalCreate
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </div>
  );
}
