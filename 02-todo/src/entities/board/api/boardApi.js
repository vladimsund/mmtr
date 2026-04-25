import { createAsyncThunk } from "@reduxjs/toolkit";

import { client } from "@/shared";

export const fetchBoards = createAsyncThunk("boards/fetch", async () => {
  const response = await client.get("/board/boards");
  return response.data;
});

export const addBoard = createAsyncThunk("boards/add", async (data) => {
  await client.post("/board/createBoard", data);
});

export const deleteBoard = createAsyncThunk("boards/delete", async (data) => {
  await client.delete(`/board/deleteBoard`, {
    params: { boardId: data.boardId },
  });
  return data;
});

export const editBoard = createAsyncThunk("boards/edit", async (data) => {
  await client.put("/board/editBoard", data);
  return data;
});
