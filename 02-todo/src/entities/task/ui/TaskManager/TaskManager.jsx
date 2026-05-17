import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

import { fetchBoards } from "@/entities/board/api";
import { fetchLists } from "@/entities/list/api";
import { ListNavigation, useList } from "@/entities/list";
import { fetchTasks } from "@/entities/task/api";
import { TaskPanel, useTask } from "@/entities/task";
import { Modal, Text } from "@/shared/ui";

import styles from "./TaskManager.module.css";

export default function TaskManager() {
  const { id: boardId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeListId, setActiveListId] = useState(null);

  const dispatch = useDispatch();

  const list = useList(boardId);
  const task = useTask(boardId);

  useEffect(() => {
    const sync = async () => {
      await dispatch(fetchBoards());
      const lists = await dispatch(fetchLists({ boardId })).unwrap();

      for (let i = 0; i < lists.length; i++) {
        dispatch(fetchTasks({ boardId, listId: lists[i].id }));
      }
    };

    sync();
  }, [dispatch, boardId]);

  function openAddListModal() {
    setActiveListId(null);
    openModal();
  }

  function openAddTaskModal(listId) {
    setActiveListId(listId);
    openModal();
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleSave(name) {
    if (activeListId) {
      task.handleSave(boardId, activeListId, name);
    } else {
      list.handleSave(name, boardId);
    }

    closeModal();
  }

  let rightContent;

  if (isModalOpen) {
    rightContent = (
      <Modal
        title={activeListId ? "Новая задача" : "Новый список"}
        onClose={closeModal}
        onSave={handleSave}
      />
    );
  } else {
    rightContent = <TaskPanel onAddTask={openAddTaskModal} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {list.isLoading ? (
          <Text text="Загрузка списков..." className={styles.loaderLists} />
        ) : (
          <ListNavigation onAddList={openAddListModal} />
        )}
      </div>
      <div className={styles.right}>
        {task.isLoading ? (
          <Text text="Загрузка задач..." className={styles.loaderTasks} />
        ) : (
          rightContent
        )}
      </div>
    </div>
  );
}
