import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { allLists } from "../selectors/listSelector";
import { fetchLists, addList, editList, deleteList } from "../slices/listSlice";

export default function useList(boardId) {
  const dispatch = useDispatch();

  const lists = useSelector(allLists);

  useEffect(() => {
    dispatch(fetchLists({ boardId }));
  }, [dispatch, boardId]);

  function handleAddList(name, boardId) {
    dispatch(addList({ name, boardId }));
  }

  function handleEditList(name, listId) {
    dispatch(editList({ name, boardId, listId }));
  }

  function handleDeleteList(listId) {
    dispatch(deleteList({ boardId, listId }));
  }

  return {
    lists,
    handleAddList,
    handleEditList,
    handleDeleteList,
  };
}
