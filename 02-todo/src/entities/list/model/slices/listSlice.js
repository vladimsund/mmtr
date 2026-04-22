import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { deleteBoard } from "@/entities/board";
import { fetchTasks } from "@/entities/task";

import * as listApi from "../../api/list";

const initialState = { lists: [] };

export const fetchLists = createAsyncThunk(
  "lists/fetchLists",
  async (data, { dispatch }) => {
    const response = await listApi.lists(data);
    const lists = response.data;

    lists.forEach((list) => {
      dispatch(fetchTasks({ boardId: data.boardId, listId: list.id }));
    });

    return lists;
  },
);

export const addList = createAsyncThunk(
  "lists/addList",
  async (data, { dispatch }) => {
    await listApi.createList(data);
    dispatch(fetchLists({ boardId: data.boardId }));
  },
);

export const deleteList = createAsyncThunk("lists/deleteList", async (data) => {
  await listApi.deleteList(data);
  return data;
});

export const editList = createAsyncThunk("lists/editList", async (data) => {
  await listApi.editList(data);
  return data;
});

const listsSlice = createSlice({
  name: "lists",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.lists = action.payload;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        const { listId } = action.payload;
        state.lists = state.lists.filter((list) => list.id !== listId);
      })
      .addCase(editList.fulfilled, (state, action) => {
        const { name, listId } = action.payload;
        const findList = state.lists.find((list) => list.id === listId);
        if (findList) {
          findList.name = name;
        }
      })
      .addCase(deleteBoard.fulfilled, (state) => {
        state.lists = [];
      });
  },
});

export default listsSlice.reducer;
