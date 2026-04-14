import { useState } from "react";

import { BoardContext } from "./context";

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([
    {
      id: 1,
      name: "Работа",
      lists: [
        {
          id: 1,
          title: "Нужно сделать",
          tasks: [
            { id: 1, text: "Купить хлеб", isActive: true },
            { id: 2, text: "Погладить кота", isActive: false },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Дом",
      lists: [
        {
          id: 1,
          title: "Покупки",
          tasks: [
            { id: 1, text: "Заказать клининг", isActive: true },
            { id: 2, text: "Заменить лампочку", isActive: true },
          ],
        },
        {
          id: 2,
          title: "Уборка",
          tasks: [{ id: 3, text: "Полить цветы", isActive: false }],
        },
      ],
    },
  ]);

  const [activeBoardId, setActiveBoardId] = useState(null);
  const currentBoard = boards.find((b) => b.id === activeBoardId);

  return (
    <BoardContext.Provider
      value={{
        boards,
        setBoards,
        activeBoardId,
        setActiveBoardId,
        currentBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
