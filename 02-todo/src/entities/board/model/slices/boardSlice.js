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
      })
      .addCase(boardApi.reorderBoard.fulfilled, (state, action) => {
        const { boardId, order: newOrder } = action.payload;

        const draggedBoard = state.boards.find((b) => b.id === boardId);
        const oldOrder = draggedBoard.order;

        if (oldOrder < newOrder) {
          for (let i = 0; i < state.boards.length; i++) {
            const b = state.boards[i];
            if (b.order > oldOrder && b.order <= newOrder) {
              state.boards[i].order--;
            }
          }
        } else {
          for (let i = 0; i < state.boards.length; i++) {
            const b = state.boards[i];
            if (b.order >= newOrder && b.order < oldOrder) {
              state.boards[i].order++;
            }
          }
        }

        draggedBoard.order = newOrder;
      });
  },
});

export default boardsSlice.reducer;
