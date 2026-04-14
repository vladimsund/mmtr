import { Text, NavBar, Modal } from "@/shared";
import { BoardLabel, BoardList, Task } from "@/entities";

import useBoardPage from "../model/useBoardPage";

import styles from "./BoardPage.module.css";

export default function BoardPage() {
  const { currentBoard, modal, taskHandlers, listHandlers } = useBoardPage();

  return (
    <div className={styles.board}>
      <div className={styles.left}>
        <BoardLabel name={currentBoard.name} />
        <NavBar
          title={"Мои списки"}
          elements={currentBoard.lists}
          onEdit={listHandlers.handleEditList}
          onDelete={listHandlers.handleDeleteList}
          titleAdd={"+ Добавить список"}
          onAdd={modal.handleOpenAddList}
        />
      </div>
      <div className={styles.panel}>
        {modal.isModalOpen ? (
          <Modal
            onClose={modal.handleCloseModal}
            onSave={modal.handleOnSave}
            title={modal.activeListId ? "Новая задача" : "Новый список"}
          />
        ) : (
          <div className={styles.panelList}>
            {currentBoard.lists.map((list) => (
              <BoardList key={list.id} title={list.title}>
                {list.tasks.map((task) => (
                  <Task
                    key={task.id}
                    title={task.text}
                    isActive={task.isActive}
                    onChange={taskHandlers.handleChangeStatusTask(
                      task.id,
                      list.id,
                    )}
                    onDelete={taskHandlers.handleDeleteTask(task.id, list.id)}
                    onEdit={taskHandlers.handleEditTask(task.id, list.id)}
                  />
                ))}
                <Text
                  text="+ Новая задача"
                  onClick={modal.handleOpenAddTask(list.id)}
                  className={styles.textNew}
                />
              </BoardList>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
