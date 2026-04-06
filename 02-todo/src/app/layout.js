'use client';
import React, { createContext, useContext, useState } from 'react';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';

const BoardContext = createContext();
export const useBoard = () => useContext(BoardContext);

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
});

export default function RootLayout({ children }) {
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [boards, setBoards] = useState([
    {
      id: 1,
      name: 'Работа',
      lists: [
        {
          id: 1,
          title: 'Нужно сделать',
          tasks: [
            { id: 1, text: 'Купить хлеб', isActive: true },
            { id: 2, text: 'Погладить кота', isActive: false },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Дом',
      lists: [
        {
          id: 1,
          title: 'Покупки',
          tasks: [
            { id: 1, text: 'Заказать клининг', isActive: true },
            { id: 2, text: 'Заменить лампочку', isActive: true },
          ],
        },
        {
          id: 2,
          title: 'Уборка',
          tasks: [{ id: 3, text: 'Полить цветы', isActive: false }],
        },
      ],
    },
  ]);

  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <BoardContext.Provider value={{ boards, setBoards, currentBoardId, setCurrentBoardId }}>
          <Header />
          <main>{children}</main>
        </BoardContext.Provider>
      </body>
    </html>
  );
}
