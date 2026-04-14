import { useBoardContext } from "@/entities";

export default function useBoard() {
  const { boards, setBoards } = useBoardContext();

  function editBoard(id, name) {
    const updatedBoards = [];
    for (let i = 0; i < boards.length; i++) {
      if (boards[i].id === id) {
        updatedBoards.push({ ...boards[i], name: name });
      } else {
        updatedBoards.push(boards[i]);
      }
    }
    setBoards(updatedBoards);
  }

  function deleteBoard(id) {
    const filteredBoards = [];
    for (let i = 0; i < boards.length; i++) {
      if (boards[i].id !== id) {
        filteredBoards.push(boards[i]);
      }
    }
    setBoards(filteredBoards);
  }

  function saveBoard(text) {
    const nextId = Date.now();
    const newBoard = { id: nextId, name: text, lists: [] };
    const newBoardsList = [];
    for (let i = 0; i < boards.length; i++) {
      newBoardsList.push(boards[i]);
    }
    newBoardsList.push(newBoard);
    setBoards(newBoardsList);
  }

  return {
    boards,
    editBoard,
    deleteBoard,
    saveBoard,
  };
}
