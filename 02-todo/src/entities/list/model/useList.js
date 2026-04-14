import { useBoardContext } from "@/entities";

export default function useList() {
  const { boards, setBoards, activeBoardId } = useBoardContext();
  const lists = boards.lists;

  function addList(title) {
    const newList = { id: Date.now(), title: title, tasks: [] };
    const updatedBoards = [];
    for (let i = 0; i < boards.length; i++) {
      if (boards[i].id === activeBoardId) {
        const updatedLists = [];
        for (let j = 0; j < boards[i].lists.length; j++) {
          updatedLists.push(boards[i].lists[j]);
        }
        updatedLists.push(newList);
        updatedBoards.push({ ...boards[i], lists: updatedLists });
      } else {
        updatedBoards.push(boards[i]);
      }
    }
    setBoards(updatedBoards);
  }

  function editList(listId, title) {
    const updatedBoards = [];
    for (let i = 0; i < boards.length; i++) {
      if (boards[i].id === activeBoardId) {
        const updatedLists = [];
        for (let j = 0; j < boards[i].lists.length; j++) {
          if (boards[i].lists[j].id === listId) {
            updatedLists.push({ ...boards[i].lists[j], title: title });
          } else {
            updatedLists.push(boards[i].lists[j]);
          }
        }
        updatedBoards.push({ ...boards[i], lists: updatedLists });
      } else {
        updatedBoards.push(boards[i]);
      }
    }
    setBoards(updatedBoards);
  }

  function deleteList(listId) {
    const updatedBoards = [];
    for (let i = 0; i < boards.length; i++) {
      if (boards[i].id === activeBoardId) {
        const filteredLists = [];
        for (let j = 0; j < boards[i].lists.length; j++) {
          if (boards[i].lists[j].id !== listId) {
            filteredLists.push(boards[i].lists[j]);
          }
        }
        updatedBoards.push({ ...boards[i], lists: filteredLists });
      } else {
        updatedBoards.push(boards[i]);
      }
    }
    setBoards(updatedBoards);
  }

  return { lists, addList, editList, deleteList };
}
