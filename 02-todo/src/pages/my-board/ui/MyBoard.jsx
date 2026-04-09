import useBoardPage from "../model/use-my-board-page";

import { Modal, AddButton } from "@/shared";
import { List, Task } from "@/entities";

import styles from "./MyBoard.module.css";

export default function MyBoard() {
  const {
    currentBoard,
    isModalOpen,
    activeListId,
    handleCloseModal,
    handleOpenAddList,
    handleOpenAddTask,
    handleAddList,
    handleEditList,
    handleDeleteList,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleChangeStatus,
    handleDragOver,
    handleDragStart,
    handleDrop,
  } = useBoardPage();

  return (
    <div className={styles.board}>
      <div className={styles.left}>
        <div className={styles.container}>
          <div className={styles.title}>Доска</div>
          <div className={styles.itemBoard}>
            <span className={styles.itemName}>{currentBoard.name}</span>
          </div>
        </div>
        <div className={styles.lists}>
          <div className={styles.title}>Мои списки</div>
          {currentBoard.lists.map((list) => (
            <List
              key={list.id}
              id={list.id}
              title={list.title}
              onEdit={handleEditList}
              onDelete={handleDeleteList}
            />
          ))}
          <div className={styles.newList} onClick={handleOpenAddList}>
            + Новый список
          </div>
        </div>
      </div>
      <div className={styles.panel}>
        {!isModalOpen ? (
          <div className={styles.panelList}>
            {currentBoard.lists.map((list) => (
              <div
                key={list.id}
                className={styles.panelListItem}
                data-list-id={list.id}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <span className={styles.panelListName}>{list.title}</span>
                {list.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={styles.panelTasks}
                    draggable
                    data-task-id={task.id}
                    data-from-list-id={list.id}
                    onDragStart={handleDragStart}
                  >
                    <div className={styles.panelTaskColumn}>
                      <Task
                        key={task.id}
                        title={task.text}
                        isActive={task.isActive}
                        onChange={handleChangeStatus}
                        onDelete={handleDeleteTask}
                        onEdit={handleEditTask}
                      />
                    </div>
                  </div>
                ))}
                <AddButton
                  text="Новая задача"
                  id={list.id}
                  onClick={handleOpenAddTask}
                />
              </div>
            ))}
          </div>
        ) : (
          <Modal
            onClose={handleCloseModal}
            onSave={activeListId ? handleAddTask : handleAddList}
            title={activeListId ? "Новая задача" : "Новый список"}
          />
        )}
      </div>
    </div>
  );
}
