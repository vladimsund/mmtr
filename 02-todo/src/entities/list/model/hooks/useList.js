import { useSelector, useDispatch } from "react-redux";

import { allLists } from "../selectors";
import * as listApi from "../../api";

export default function useList(boardId) {
  const dispatch = useDispatch();

  const lists = useSelector(allLists);

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
    handleSave,
    handleEdit,
    handleDelete,
    handleReorder,
  };
}
