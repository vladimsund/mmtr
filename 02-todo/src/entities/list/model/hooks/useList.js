import { useSelector, useDispatch } from "react-redux";

import { allLists } from "../selectors";
import { fetchLists, addList, editList, deleteList } from "../../api";

export default function useList(boardId) {
  const dispatch = useDispatch();

  const lists = useSelector(allLists);

  async function handleSave(name, boardId) {
    await dispatch(addList({ name, boardId }));
    dispatch(fetchLists({ boardId }));
  }

  function handleEdit(name, listId) {
    dispatch(editList({ name, boardId, listId }));
  }

  function handleDelete(listId) {
    dispatch(deleteList({ boardId, listId }));
  }

  return {
    lists,
    handleSave,
    handleEdit,
    handleDelete,
  };
}
