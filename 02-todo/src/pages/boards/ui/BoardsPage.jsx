import { NavBar, Modal } from "@/shared";

import useBoardsPage from "../model/useBoardsPage";

import styles from "./BoardsPage.module.css";

export default function BoardsPage() {
  const { boards, isModalOpen, actions } = useBoardsPage();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <NavBar
          title={"Мои доски"}
          elements={boards}
          onEdit={actions.handleEditBoard}
          onDelete={actions.handleDeleteBoard}
          onClick={actions.handleClickBoard}
          titleAdd={"+ Добавить доску"}
          onAdd={actions.handleOpenModal}
        />
      </div>
      <div className={styles.right}>
        <Modal
          isOpen={isModalOpen}
          title="Создать доску"
          onClose={actions.handleCloseModal}
          onSave={actions.handleSaveBoard}
        />
      </div>
    </div>
  );
}
