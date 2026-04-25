import { createSlice } from "@reduxjs/toolkit";

import * as boardApi from "../../api";

const initialState = { boards: [] };

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(boardApi.fetchBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
      })
      .addCase(boardApi.deleteBoard.fulfilled, (state, action) => {
        const { boardId } = action.payload;
        state.boards = state.boards.filter((board) => board.id !== boardId);
      })
      .addCase(boardApi.editBoard.fulfilled, (state, action) => {
        const { name, boardId } = action.payload;
        const findBoard = state.boards.find((board) => board.id === boardId);
        findBoard.name = name;
      });
  },
});

export default boardsSlice.reducer;
