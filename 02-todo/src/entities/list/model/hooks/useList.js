import { useSelector, useDispatch } from "react-redux";

import { allLists, isListsLoading } from "../selectors";
import * as listApi from "../../api";

export default function useList(boardId) {
  const dispatch = useDispatch();

  const lists = useSelector(allLists);
  const isLoading = useSelector(isListsLoading);

  async function handleSave(name, boardId) {
    await dispatch(listApi.addList({ name, boardId }));
    dispatch(listApi.fetchLists({ boardId }));
  }

  function handleEdit(name, listId) {
    dispatch(listApi.editList({ name, boardId, listId }));
  }

  function handleDelete(listId) {
    dispatch(listApi.deleteList({ boardId, listId }));
  }

  function handleReorder(boardId, listId, order) {
    dispatch(listApi.reorderList({ boardId, listId, order }));
  }

  return {
    lists,
    isLoading,
    handleSave,
    handleEdit,
    handleDelete,
    handleReorder,
  };
}
