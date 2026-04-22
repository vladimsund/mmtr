import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { deleteList } from "@/entities/list";
import { deleteBoard } from "@/entities/board";

import * as taskApi from "../../api/task";

const initialState = { tasks: [] };

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (data) => {
  const response = await taskApi.tasks(data);
  return response.data;
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (data, { dispatch }) => {
    await taskApi.createTask(data);
    dispatch(fetchTasks(data));
  },
);

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (data) => {
  await taskApi.deleteTask(data);
  return data;
});

export const editTask = createAsyncThunk("tasks/editTask", async (data) => {
  await taskApi.editTask(data);
  return data;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const newTasks = action.payload;
        newTasks.forEach((newTask) => {
          const exists = state.tasks.find((t) => t.id === newTask.id);
          if (!exists) {
            state.tasks.push(newTask);
          }
        });
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const id = action.payload.taskId;
        state.tasks = state.tasks.filter((task) => task.id !== id);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const { name, taskId, isActive } = action.payload;
        const findTask = state.tasks.find((task) => task.id === taskId);
        if (findTask) {
          findTask.name = name;
          findTask.isActive = isActive;
        }
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        const { listId } = action.payload;
        state.tasks = state.tasks.filter((task) => task.listId !== listId);
      })
      .addCase(deleteBoard.fulfilled, (state) => {
        state.tasks = [];
      });
  },
});

export default tasksSlice.reducer;
