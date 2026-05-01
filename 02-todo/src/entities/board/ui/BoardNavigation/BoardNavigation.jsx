import { BoardLabel } from "@/entities";
import { useBoard } from "@/entities/board";
import { Text } from "@/shared/ui";

import { Board } from "../Board";

import styles from "./BoardNavigation.module.css";

export default function BoardNavigation({ onAddBoard }) {
  const board = useBoard();

  const sortedBoards = [...board.boards].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.lists}>
      <Text text="Мои доски" className={styles.title} />
      {sortedBoards.map((board) => (
        <Board key={board.id} element={board} />
      ))}
      <Text
        onClick={onAddBoard}
        text="+ Добавить доску"
        className={styles.textNew}
      />
    </div>
  );
}
