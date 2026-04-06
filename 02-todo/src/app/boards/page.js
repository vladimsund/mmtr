'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import EditItem from '@/components/EditItem/EditItem';
import Modal from '@/components/Modal/Modal';
import { useBoard } from '@/app/layout';

export default function Boards() {
  const router = useRouter();
  const { boards, setBoards, setCurrentBoardId } = useBoard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditBoardName = (id, newName) => {
    setBoards(boards.map((b) => (b.id === id ? { ...b, name: newName } : b)));
  };

  const handleDelete = (id) => {
    setBoards(boards.filter((board) => board.id !== id));
  };

  const handleSaveNewBoard = (text) => {
    if (!text.trim()) return;
    const nextId = Date.now();
    const newBoard = { id: nextId, name: text, lists: [] };
    setBoards([...boards, newBoard]);
    setIsModalOpen(false);
  };

  const handleBoardClick = (boardId) => {
    setCurrentBoardId(boardId);
    localStorage.setItem('currentBoardId', boardId);
    router.push(`/boards/my_board`);
  };

  return (
    <div className={styles['boards']}>
      <div className={styles['boards__left']}>
        <div className={styles['boards__container']}>
          <div className={styles['boards__title']}>Мои доски</div>
          <div className={styles['boards__list']}>
            {boards.map((board) => (
              <div key={board.id} style={{ cursor: 'pointer' }}>
                <EditItem
                  key={board.id}
                  object={{ id: board.id, title: board.name }}
                  handleEditList={handleEditBoardName}
                  handleDeleteList={handleDelete}
                  onClick={() => handleBoardClick(board.id)}
                />
              </div>
            ))}
          </div>
          <div className={styles['boards__new']} onClick={() => setIsModalOpen(true)}>
            + Новая доска
          </div>
        </div>
      </div>
      <div className={styles['boards__right']}>
        {isModalOpen && (
          <Modal
            title="Создать доску"
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveNewBoard}
          />
        )}
      </div>
    </div>
  );
}
