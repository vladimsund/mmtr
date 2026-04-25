import { createSlice } from "@reduxjs/toolkit";

import * as boardApi from "@/entities/board/api";

import * as listApi from "../../api";

const initialState = { lists: [] };

const listsSlice = createSlice({
  name: "lists",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(listApi.fetchLists.fulfilled, (state, action) => {
        state.lists = action.payload;
      })
      .addCase(listApi.deleteList.fulfilled, (state, action) => {
        const { listId } = action.payload;
        state.lists = state.lists.filter((list) => list.id !== listId);
      })
      .addCase(listApi.editList.fulfilled, (state, action) => {
        const { name, listId } = action.payload;
        const findList = state.lists.find((list) => list.id === listId);
        findList.name = name;
      })
      .addCase(boardApi.deleteBoard.fulfilled, (state) => {
        state.lists = [];
      });
  },
});

export default listsSlice.reducer;
