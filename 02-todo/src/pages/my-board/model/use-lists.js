export default function useBoardLists(
  currentBoard,
  setBoards,
  handleCloseModal,
) {
  function updateListsInBoard(listsCallback) {
    const newLists = listsCallback(currentBoard.lists);

    setBoards((prev) =>
      prev.map((b) =>
        b.id === currentBoard.id ? { ...b, lists: newLists } : b,
      ),
    );
  }

  function handleAddList(title) {
    if (!title.trim()) {
      return;
    }

    updateListsInBoard((lists) => [
      ...lists,
      { id: Date.now(), title, tasks: [] },
    ]);

    handleCloseModal();
  }

  function handleEditList(listId, newTitle) {
    updateListsInBoard((lists) =>
      lists.map((l) => (l.id === listId ? { ...l, title: newTitle } : l)),
    );
  }

  function handleDeleteList(listId) {
    updateListsInBoard((lists) => lists.filter((l) => l.id !== listId));
  }

  return {
    updateListsInBoard,
    handleAddList,
    handleEditList,
    handleDeleteList,
  };
}
