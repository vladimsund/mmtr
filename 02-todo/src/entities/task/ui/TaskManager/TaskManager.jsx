import { useState } from "react";
import { useParams } from "react-router";

import { ListNavigation, useList } from "@/entities/list";
import { TaskPanel, useTask } from "@/entities/task";
import { Modal } from "@/shared";

import styles from "./TaskManager.module.css";

export default function TaskManager() {
  const { id: boardId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeListId, setActiveListId] = useState(null);

  const { handleAddList } = useList(boardId);
  const { handleAddTask } = useTask(boardId);

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
      handleAddTask(boardId, activeListId, name);
    } else {
      handleAddList(name, boardId);
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
        <ListNavigation onAddList={openAddListModal} />
      </div>
      <div className={styles.right}>{rightContent}</div>
    </div>
  );
}
