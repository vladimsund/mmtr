import { createAsyncThunk } from "@reduxjs/toolkit";

import { client } from "@/shared";

export const fetchTasks = createAsyncThunk("tasks/fetch", async (data) => {
  const response = await client.get(`/task/task`, {
    params: { boardId: data.boardId, listId: data.listId },
  });
  return response.data;
});

export const addTask = createAsyncThunk("tasks/add", async (data) => {
  await client.post("/task/createTask", data);
});

export const deleteTask = createAsyncThunk("tasks/delete", async (data) => {
  await client.delete(`/task/deleteTask`, {
    params: {
      boardId: data.boardId,
      listId: data.listId,
      taskId: data.taskId,
    },
  });
  return data;
});

export const editTask = createAsyncThunk("tasks/edit", async (data) => {
  await client.put("/task/editTask", data);
  return data;
});
