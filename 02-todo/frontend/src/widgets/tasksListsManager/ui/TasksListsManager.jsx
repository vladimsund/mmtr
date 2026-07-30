import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { useList } from "@/entities/list";
import { TaskPanel, useTask } from "@/entities/task";
import { Modal, Text } from "@/shared/ui";
import { ListNavigation } from "@/features/listNavigation";

import styles from "./TasksListsManager.module.css";

export function TasksListsManager() {
  const { id: boardId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeListId, setActiveListId] = useState(null);

  const list = useList(boardId);
  const task = useTask(boardId);

  useEffect(() => {
    const sync = async () => {
      const freshLists = await list.handleFetch();

      await freshLists.forEach(async (l) => {
        await task.handleFetch(l.id);
      });
    };

    if (boardId) {
      sync();
    }
  }, [boardId]);

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

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <ListNavigation onAddList={openAddListModal} />
      </div>
      <div className={styles.right}>
        {isModalOpen ? (
          <Modal
            title={activeListId ? "Новая задача" : "Новый список"}
            isOpen={isModalOpen}
            onClose={closeModal}
            onSave={handleSave}
          />
        ) : (
          <TaskPanel onAddTask={openAddTaskModal} />
        )}
      </div>
    </div>
  );
}
