import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchBoards, addBoard, editBoard, deleteBoard } from "../slices";
import { allBoards } from "../selectors";

export default function useBoard() {
  const dispatch = useDispatch();
  const boards = useSelector(allBoards);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  function handleSave(name) {
    dispatch(addBoard({ name }));
  }

  function handleEdit(name, boardId) {
    dispatch(editBoard({ boardId, name }));
  }

  function handleDelete(boardId) {
    dispatch(deleteBoard({ boardId: boardId }));
  }

  return {
    boards,
    handleSave,
    handleEdit,
    handleDelete,
  };
}
