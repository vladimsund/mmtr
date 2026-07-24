import { useSelector, useDispatch } from "react-redux";

import { allLists, isListsLoading } from "../selectors";
import * as listApi from "../../api";

export default function useList(boardId) {
  const dispatch = useDispatch();

  const lists = useSelector(allLists);
  const isLoading = useSelector(isListsLoading);

  async function handleFetch() {
    await dispatch(listApi.fetchLists({ boardId }));
  }

  async function handleSave(name, boardId) {
    await dispatch(listApi.addList({ name, boardId }));
    handleFetch();
  }

  async function handleEdit(name, listId) {
    await dispatch(listApi.editList({ name, boardId, listId }));
  }

  async function handleDelete(listId) {
    await dispatch(listApi.deleteList({ boardId, listId }));
  }

  async function handleReorder(boardId, listId, order) {
    await dispatch(listApi.reorderList({ boardId, listId, order }));
  }

  return {
    lists,
    isLoading,
    handleFetch,
    handleSave,
    handleEdit,
    handleDelete,
    handleReorder,
  };
}
