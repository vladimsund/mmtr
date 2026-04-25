import { useSelector, useDispatch } from "react-redux";

import { fetchBoards, addBoard, editBoard, deleteBoard } from "../../api";
import { allBoards } from "../selectors";

export default function useBoard() {
  const dispatch = useDispatch();

  const boards = useSelector(allBoards);

  async function handleSave(name) {
    await dispatch(addBoard({ name }));
    dispatch(fetchBoards());
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
