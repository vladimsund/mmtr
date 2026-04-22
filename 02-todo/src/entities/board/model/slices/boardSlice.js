import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as boardApi from "../../api/board";

const initialState = { boards: [] };

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const data = await boardApi.boards();
  return data.data;
});

export const addBoard = createAsyncThunk(
  "boards/addBoard",
  async (data, { dispatch }) => {
    await boardApi.createBoard(data);
    dispatch(fetchBoards());
  },
);

export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (data) => {
    await boardApi.deleteBoard(data);
    return data;
  },
);

export const editBoard = createAsyncThunk("boards/editBoard", async (data) => {
  await boardApi.editBoard(data);
  return data;
});

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        const { boardId } = action.payload;
        state.boards = state.boards.filter((board) => board.id !== boardId);
      })
      .addCase(editBoard.fulfilled, (state, action) => {
        const { name, boardId } = action.payload;
        const findBoard = state.boards.find((board) => board.id === boardId);
        if (findBoard) {
          findBoard.name = name;
        }
      });
  },
});

export default boardsSlice.reducer;
