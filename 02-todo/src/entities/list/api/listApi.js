import { createAsyncThunk } from "@reduxjs/toolkit";

import { client } from "@/shared";

export const fetchLists = createAsyncThunk("lists/fetch", async (data) => {
  const response = await client.get(`/list/list`, {
    params: { boardId: data.boardId },
  });
  return response.data;
});

export const addList = createAsyncThunk("lists/add", async (data) => {
  await client.post("/list/createList", data);
  return data;
});

export const deleteList = createAsyncThunk("lists/delete", async (data) => {
  await client.delete(`/list/deleteList`, {
    params: { boardId: data.boardId, listId: data.listId },
  });
  return data;
});

export const editList = createAsyncThunk("lists/edit", async (data) => {
  await client.put("/list/editList", data);
  return data;
});
