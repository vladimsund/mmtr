'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Modal from '@/components/Modal/Modal';
import EditItem from '@/components/EditItem/EditItem';
import TaskItem from '@/components/TaskItem/TaskItem';
import { useBoard } from '@/app/layout';
import { useDnD } from '@/hooks/useDnD';

export default function Boards() {
  const { boards, setBoards, currentBoardId, setCurrentBoardId } = useBoard();

  useEffect(() => {
    const savedId = localStorage.getItem('currentBoardId');
    if (savedId && !currentBoardId) {
      setCurrentBoardId(Number(savedId));
    }
  }, [currentBoardId, setCurrentBoardId]);

  const currentBoard = boards.find((b) => b.id === currentBoardId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeListId, setActiveListId] = useState(null);
  const { onDragStart, onDrop } = useDnD(currentBoard, boards, setBoards);

  if (!currentBoard) {
    return <div className={styles['board']}>Загрузка доски...</div>;
  }

  const handleOpenAddList = () => {
    setActiveListId(null);
    setIsModalOpen(true);
  };

  const handleOpenAddTask = (id) => {
    setActiveListId(id);
    setIsModalOpen(true);
  };

  const handleSave = (text) => {
    if (!text.trim()) return;
    const newId = Date.now();
    let newLists = [];
    if (!activeListId) {
      const newList = { id: newId, title: text, tasks: [] };
      newLists = [...currentBoard.lists, newList];
    } else {
      for (let list of currentBoard.lists) {
        if (list.id === activeListId) {
          const newTask = { id: newId, text, isActive: true };
          const updatedList = { ...list, tasks: [...list.tasks, newTask] };
          newLists.push(updatedList);
        } else {
          newLists.push(list);
        }
      }
    }
    setBoards(boards.map((b) => (b.id === currentBoard.id ? { ...b, lists: newLists } : b)));
    setIsModalOpen(false);
    setActiveListId(null);
  };

  const handleEditList = (listId, newTitle) => {
    const newLists = [];
    for (let list of currentBoard.lists) {
      newLists.push(list.id === listId ? { ...list, title: newTitle } : list);
    }
    setBoards(boards.map((b) => (b.id === currentBoard.id ? { ...b, lists: newLists } : b)));
  };

  const handleDeleteList = (listId) => {
    const newLists = [];
    for (let i = 0; i < currentBoard.lists.length; i++) {
      const list = currentBoard.lists[i];
      if (list.id !== listId) {
        newLists.push(list);
      }
    }
    setBoards(boards.map((b) => (b.id === currentBoard.id ? { ...b, lists: newLists } : b)));
  };

  const handleEditTask = (listId, taskId, newText) => {
    const newLists = [];
    for (let list of currentBoard.lists) {
      if (list.id === listId) {
        const newTasks = [];
        for (let task of list.tasks) {
          if (task.id === taskId) {
            newTasks.push({ ...task, text: newText });
          } else {
            newTasks.push(task);
          }
        }
        newLists.push({ ...list, tasks: newTasks });
      } else {
        newLists.push(list);
      }
    }
    setBoards(boards.map((b) => (b.id === currentBoard.id ? { ...b, lists: newLists } : b)));
  };

  const handleDeleteTask = (listId, taskId) => {
    const newLists = [];
    for (let list of currentBoard.lists) {
      if (list.id === listId) {
        const newTasks = [];
        for (let task of list.tasks) {
          if (task.id !== taskId) {
            newTasks.push(task);
          }
        }
        newLists.push({ ...list, tasks: newTasks });
      } else {
        newLists.push(list);
      }
    }
    setBoards(boards.map((b) => (b.id === currentBoard.id ? { ...b, lists: newLists } : b)));
  };

  const handleChangeStatus = (listId, taskId) => {
    const newLists = [];
    for (let list of currentBoard.lists) {
      if (list.id === listId) {
        const newTasks = [];
        for (let task of list.tasks) {
          if (task.id === taskId) {
            newTasks.push({ ...task, isActive: !task.isActive });
          } else {
            newTasks.push(task);
          }
        }
        newLists.push({ ...list, tasks: newTasks });
      } else {
        newLists.push(list);
      }
    }
    setBoards(boards.map((b) => (b.id === currentBoard.id ? { ...b, lists: newLists } : b)));
  };

  return (
    <div className={styles['board']}>
      <div className={styles['board__left']}>
        <div className={styles['board__container']}>
          <div className={styles['board__title']}>Доска</div>
          <div className={styles['board__item-board']}>
            <span className={styles['board__item-name']}>{currentBoard.name}</span>
          </div>
        </div>
        <div className={styles['board__lists']}>
          <div className={styles['board__title']}>Мои списки</div>
          {currentBoard.lists.map((list) => (
            <EditItem
              key={list.id}
              object={list}
              handleEditList={handleEditList}
              handleDeleteList={handleDeleteList}
            />
          ))}
          <div className={styles['board__new-list']} onClick={handleOpenAddList}>
            + Новый список
          </div>
        </div>
      </div>
      <div className={styles['panel']}>
        {!isModalOpen ? (
          <div className={styles['panel__list']}>
            {currentBoard.lists.map((list) => (
              <div
                key={list.id}
                className={styles['panel__list-item']}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, list.id)}
              >
                <span className={styles['panel__list-name']}>{list.title}</span>
                {list.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={styles['panel__tasks']}
                    draggable
                    onDragStart={(e) => onDragStart(e, task.id, list.id)}
                  >
                    <div className={styles['panel__task-column']}>
                      <TaskItem
                        key={task.id}
                        task={task}
                        list={list}
                        handleChangeStatus={handleChangeStatus}
                        handleEditTask={handleEditTask}
                        handleDeleteTask={handleDeleteTask}
                      />
                    </div>
                  </div>
                ))}
                <span
                  className={styles['panel__new-task']}
                  onClick={() => handleOpenAddTask(list.id)}
                >
                  + Новая задача
                </span>
              </div>
            ))}
          </div>
        ) : (
          <Modal
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            title={!activeListId ? 'Новый список' : 'Новая задача'}
          />
        )}
      </div>
    </div>
  );
}
