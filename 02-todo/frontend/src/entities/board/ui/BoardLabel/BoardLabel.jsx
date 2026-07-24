import { useParams } from "react-router";

import { Text } from "@/shared/ui";
import { useBoard } from "@/entities/board";

import styles from "./BoardLabel.module.css";

export function BoardLabel() {
  const { id: boardId } = useParams();

  const { boards } = useBoard();
  const boardName = handleFindBoard(boardId);

  function handleFindBoard(boardId) {
    const board = boards.find((b) => b.id === boardId);

    if (!board) {
      return null;
    }

    return board.name;
  }

  if (!boardName) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Text text={"Доска"} className={styles.title} />
      <div className={styles.itemBoard}>
        <Text text={boardName} className={styles.itemName} />
      </div>
    </div>
  );
}
