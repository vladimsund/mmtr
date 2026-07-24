import { useBoard } from "@/entities/board";
import { Text } from "@/shared/ui";

import { BoardCard } from "../BoardCard";

import styles from "./BoardNavigation.module.css";

export function BoardNavigation({ onAddBoard }) {
  const board = useBoard();

  const sortedBoards = [...board.boards].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.lists}>
      <Text text="Мои доски" className={styles.title} />
      {sortedBoards.map((board) => (
        <BoardCard key={board.id} element={board} />
      ))}
      <Text
        onClick={onAddBoard}
        text="+ Добавить доску"
        className={styles.textNew}
      />
    </div>
  );
}
