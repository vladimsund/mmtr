import { useSelector, useDispatch } from "react-redux";

import * as boardApi from "../../api";
import { allBoards, isBoardsLoading } from "../selectors";

export default function useBoard() {
  const dispatch = useDispatch();

  const boards = useSelector(allBoards);
  const isLoading = useSelector(isBoardsLoading);

  async function handleFetch() {
    await dispatch(boardApi.fetchBoards());
  }

  async function handleSave(name) {
    await dispatch(boardApi.addBoard({ name }));
    handleFetch();
  }

  async function handleEdit(name, boardId) {
    await dispatch(boardApi.editBoard({ boardId, name }));
  }

  async function handleDelete(boardId) {
    await dispatch(boardApi.deleteBoard({ boardId }));
  }

  async function handleReorder(boardId, order) {
    await dispatch(boardApi.reorderBoard({ boardId, order }));
  }

  return {
    boards,
    isLoading,
    handleFetch,
    handleSave,
    handleEdit,
    handleDelete,
    handleReorder,
  };
}
