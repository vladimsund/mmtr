import { useParams } from "react-router";

import { Text } from "@/shared/ui";
import { useBoard } from "@/entities/board";

import styles from "./BoardLabel.module.css";

export default function BoardLabel() {
  const { id: boardId } = useParams();

  const { boards } = useBoard();
  const boardName = handleFindBoard(boardId);

  function handleFindBoard(boardId) {
    const board = boards.find((b) => b.id === boardId);

    if (!board) {
      return;
    }

    return board.name;
  }

  if (!boardName) {
    return;
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
