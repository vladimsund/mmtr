import { useParams } from "react-router";

import { BoardLabel } from "@/entities";
import { useList } from "@/entities/list";
import { Text } from "@/shared/ui";

import { List } from "../List";

import styles from "./ListNavigation.module.css";

export default function ListNavigation({ onAddList }) {
  const { id: boardId } = useParams();
  const list = useList(boardId);

  const sortedLists = [...list.lists].sort((a, b) => a.order - b.order);

  return (
    <div>
      <BoardLabel />
      <div className={styles.lists}>
        <Text text="Мои списки" className={styles.title} />
        {sortedLists.map((list) => (
          <List key={list.id} element={list} />
        ))}
        <Text
          onClick={onAddList}
          text="+ Добавить список"
          className={styles.textNew}
        />
      </div>
    </div>
  );
}
