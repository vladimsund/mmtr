import { useSelector, useDispatch } from "react-redux";

import * as boardApi from "../../api";
import { allBoards } from "../selectors";

export default function useBoard() {
  const dispatch = useDispatch();

  const boards = useSelector(allBoards);

  async function handleSave(name) {
    await dispatch(boardApi.addBoard({ name }));
    dispatch(boardApi.fetchBoards());
  }

  function handleEdit(name, boardId) {
    dispatch(boardApi.editBoard({ boardId, name }));
  }

  function handleDelete(boardId) {
    dispatch(boardApi.deleteBoard({ boardId }));
  }

  function handleReorder(boardId, order) {
    dispatch(boardApi.reorderBoard({ boardId, order }));
  }

  return {
    boards,
    handleSave,
    handleEdit,
    handleDelete,
    handleReorder,
  };
}
